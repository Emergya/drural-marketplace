def can_manage_companies(user):
    from ...core.permissions import CompanyPermissions

    """Check if the user has the permission to manage companies."""

    return user.has_perms([CompanyPermissions.MANAGE_COMPANIES])


def has_company_permissions(user, company_id):
    if not user.is_authenticated:
        return False
    return user.is_company_manager(company_id) or can_manage_companies(user)
