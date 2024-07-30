from ...account.utils import requestor_is_staff_member_or_app
from ...core.exceptions import PermissionDenied
from ...graphql.utils import get_user_or_app_from_context
from ...app import models
from ...core.jwt import create_access_token_for_app
from ...core.permissions import AppPermission
from ..core.utils import from_global_id_or_error
from ..decorators import permission_required
from .enums import AppTypeEnum


def resolve_apps_installations(info, **_kwargs):
    return models.AppInstallation.objects.all()


def resolve_apps(info, **_kwargs):
    return models.App.objects.all()


def resolve_apps_by_user(info, user, **_kwargs):
    return models.App.objects.filter(user=user)


def resolve_access_token(info, root, **_kwargs):
    if root.type != AppTypeEnum.THIRDPARTY.value:
        return None

    user = info.context.user
    if user.is_anonymous:
        return None
    return create_access_token_for_app(root, user)


@permission_required(AppPermission.MANAGE_APPS)
def resolve_app(_info, id):
    requestor = get_user_or_app_from_context(_info.context)
    if not id:
        return None
    _, id = from_global_id_or_error(id, "App")
    is_mine = models.App.objects.filter(id=id, user=requestor).exists()
    if not requestor_is_staff_member_or_app(requestor) and not is_mine:
        raise PermissionDenied()
    return models.App.objects.filter(id=id).first()
