from django.db.models import Q


def search_customer(qs, value):
    qs = qs.filter(
        Q(user_email__trigram_similar=value)
        | Q(user__email__trigram_similar=value)
        | Q(user__first_name__trigram_similar=value)
        | Q(user__last_name__trigram_similar=value)
    )
    return qs
