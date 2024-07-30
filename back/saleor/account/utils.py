from typing import TYPE_CHECKING, Union
from attr import has

from django.contrib.auth.models import Group, Permission

from ..app.models import App
from ..checkout import AddressType
from ..core.permissions import get_seller_permissions_codename
from ..core.utils import create_thumbnails
from .models import User

if TYPE_CHECKING:
    from ..plugins.manager import PluginsManager
    from .models import Address


SELLERS_GROUP_NAME = "Sellers"


def store_user_address(
    user: User,
    address: "Address",
    address_type: str,
    manager: "PluginsManager",
):
    """Add address to user address book and set as default one."""
    address = manager.change_user_address(address, address_type, user)
    address_data = address.as_data()

    address = user.addresses.filter(**address_data).first()
    if address is None:
        address = user.addresses.create(**address_data)

    if address_type == AddressType.BILLING:
        if not user.default_billing_address:
            set_user_default_billing_address(user, address)
    elif address_type == AddressType.SHIPPING:
        if not user.default_shipping_address:
            set_user_default_shipping_address(user, address)


def set_user_default_billing_address(user, address):
    user.default_billing_address = address
    user.save(update_fields=["default_billing_address"])


def set_user_default_shipping_address(user, address):
    user.default_shipping_address = address
    user.save(update_fields=["default_shipping_address"])


def change_user_default_address(
    user: User, address: "Address", address_type: str, manager: "PluginsManager"
):
    address = manager.change_user_address(address, address_type, user)
    if address_type == AddressType.BILLING:
        if user.default_billing_address:
            user.addresses.add(user.default_billing_address)
        set_user_default_billing_address(user, address)
    elif address_type == AddressType.SHIPPING:
        if user.default_shipping_address:
            user.addresses.add(user.default_shipping_address)
        set_user_default_shipping_address(user, address)


def create_superuser(credentials):

    user, created = User.objects.get_or_create(
        email=credentials["email"],
        defaults={"is_active": True, "is_staff": True, "is_superuser": True},
    )
    if created:
        user.set_password(credentials["password"])
        user.save()
        create_thumbnails(
            pk=user.pk, model=User, size_set="user_avatars", image_attr="avatar"
        )
        msg = "Superuser - %(email)s/%(password)s" % credentials
    else:
        msg = "Superuser already exists - %(email)s" % credentials
    return msg


def remove_staff_member(staff):
    """Remove staff member account only if it has no orders placed.

    Otherwise, switches is_staff status to False.
    """
    if staff.orders.exists():
        staff.is_staff = False
        staff.user_permissions.clear()
        staff.save()
    else:
        staff.delete()


def requestor_is_staff_member_or_app(requestor: Union[User, App]):
    """Return true if requestor is an active app or active staff user."""
    is_staff = False
    if isinstance(requestor, User):
        is_staff = getattr(requestor, "is_staff")
    elif isinstance(requestor, App):
        is_staff = getattr(requestor.user, "is_staff")
    return is_staff and requestor.is_active


def requestor_is_staff_and_has_permissions(requestor: Union[User, App], permissions):
    """Return true if requestor is an active staff user and have permissions."""
    has_perms = False
    is_staff = False
    if isinstance(requestor, User):
        is_staff = getattr(requestor, "is_staff")
        has_perms = requestor.has_perms(permissions)
    elif isinstance(requestor, App):
        is_staff = True
        has_perms = True
    return is_staff and has_perms and requestor.is_active


def add_user_in_sellers_group(user: User):
    group, created = Group.objects.get_or_create(name=SELLERS_GROUP_NAME)
    if created:
        seller_permissions = Permission.objects.filter(
            codename__in=get_seller_permissions_codename()
        )
        group.permissions.add(*seller_permissions)
    group.user_set.add(user)


def requestor_is_seller(requestor: Union["User", "App"]):
    if not isinstance(requestor, User):
        return False
    return requestor.groups.filter(name=SELLERS_GROUP_NAME).exists()

def requestor_check_seller(requestor: Union["User", "App"]):
    if not isinstance(requestor, User):
        return False
    if hasattr(requestor, "is_seller"):
        return requestor.is_seller