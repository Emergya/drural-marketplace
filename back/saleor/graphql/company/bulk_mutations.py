import graphene
from collections import defaultdict
from django.contrib.gis.geos import Point
from django.core.exceptions import ValidationError

from django.contrib.auth.models import Group

from ..account.types import User
from ...account.error_codes import AccountErrorCode
from ...company import models
from ...core.exceptions import PermissionDenied
from ..core.mutations import ModelMutation, BaseBulkMutation
from ..core.types.common import AccountError


from ..utils import get_user_or_app_from_context

class BulkRemoveCompanyAgent(BaseBulkMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="ID of a agent to remove."
        )
        company = graphene.ID(required=True, description="Company ID.")

    class Meta:
        description = "Removes agents from the company"
        model = models.User
        error_type_class = AccountError

    @classmethod
    def check_own_company(cls, requestor, company):
        if not requestor.is_company_manager(company.id) and not requestor.is_staff:
            raise PermissionDenied("You do not own the company.")

    
    @classmethod
    def check_agent_own_company(cls, instance, company):
        if not instance.is_company_manager(company.id):
            raise PermissionDenied("This user is not a company manager.")

    @classmethod
    def clean_ids(cls, info, instances, company):
        requestor = get_user_or_app_from_context(info.context)
        
        cls.check_own_company(requestor, company)

        for instance in instances:
            cls.check_agent_own_company(instance, company)

    @classmethod
    def perform_mutation(cls, root, info, ids, **data):
        instances = cls.get_nodes_or_error(ids, "id", User)
        company = cls.get_node_or_error(info, data.get("company"), field="company")

        cls.clean_ids(info, instances, company)

        count = len(instances)
        if count:
            # cls.bulk_action(info, instances, **data)
            count, errors = super().perform_mutation(root, info, ids, **data)

        cls.post_process(info, count)
        return count, errors

    @classmethod
    def post_process(cls, info, count):
        pass

    @classmethod
    def bulk_action(cls, info, queryset, **kwargs):
        company = cls.get_node_or_error(info, kwargs.get("company"), field="company")
        sellers_group = Group.objects.get(name="Sellers")
        for instance in queryset:
            instance.companies.remove(company)

            if instance.groups.filter(id=sellers_group.id).exists() and not instance.companies.exists():
                instance.groups.remove(sellers_group)

            instance.save()

