from datetime import timedelta

from django.db.models.aggregates import Count
from django.db.models.expressions import F
from django.db.models.functions.datetime import TruncDate

from saleor.company.models import Company

from ...product.models import ProductRating


def resolve_company(pk):
    return Company.objects.filter(pk=pk).first()


def resolve_companies():
    return Company.objects.order_by("public_name", "name")


def resolve_user_companies(user):
    return user.companies.order_by("public_name", "name")


def resolve_company_addition_stat(start_date, end_date):
    # This method will return the accumulative number of companies by date.

    # Number of companies registered before the start_date
    companies_before = Company.objects.filter(created__lt=(start_date)).count()

    data = (
        Company.objects.filter(created__date__range=(start_date, end_date))
        .annotate(date=TruncDate("created"))
        .order_by("date")
        .values("date")
        .annotate(**{"total": Count("date")})
        .values("date", "total")
    )

    # Acumulating number of companies from the start to the end date
    response = []
    d = start_date.date()
    index = 0
    while d <= end_date.date():
        if len(data) != 0 and d == data[index].get(
            "date"
        ):  # Update current number of users if it is required
            companies_before = companies_before + data[index].get("total")
            if index < len(data) - 1:
                index = index + 1
        # Add the new entry to the response list
        new_entry = {
            "date": d,
            "total": companies_before,
        }
        response.append(new_entry)
        d = d + timedelta(days=1)

    return response


def resolve_reviews_from_company(company: Company):
    return ProductRating.objects.filter(product__company=company)


def resolve_review_percentages_company(company: Company):
    n_reviews = ProductRating.objects.filter(product__company=company).count()
    data = (
        ProductRating.objects.filter(product__company=company)
        .values("rating")
        .order_by("-rating")
        .annotate(total=Count("rating"))
        .annotate(stars=F("rating"))
        .values("stars", "total")
    )
    index = 0
    response = []
    for i in range(1, 6):
        if len(data) != 0 and index < len(data) and data[index].get("stars") == 6 - i:
            object = {
                "stars": data[index].get("stars"),
                "total": 100 * data[index].get("total") / n_reviews,
            }
            index = index + 1
        else:
            object = {"stars": 6 - i, "total": 0}
        response.append(object)
    return response
