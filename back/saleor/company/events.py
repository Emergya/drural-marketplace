from .models import CompanyValidationEvent


def company_validation_event(context, instance, reason: str):
    CompanyValidationEvent.objects.create(
        company=instance,
        status=instance.status,
        reason=reason,
        validated_by=context.user,
        created=instance.modified
    )
