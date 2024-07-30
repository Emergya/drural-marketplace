from ...product.models import ProductRating


def test_update_rating(company, review, customer_user, product):
    total_reviews = ProductRating.objects.filter(product__company=company).count()
    assert total_reviews == 1
    assert review.rating == 5
    assert company.rating == 5

    ProductRating.objects.create(
        user=customer_user, product=product, rating=3, comment="Lorem ipsum"
    )
    total_reviews = ProductRating.objects.filter(product__company=company).count()
    assert total_reviews == 2
    product.calcule_rating()
    company.refresh_from_db()
    assert company.rating == 4.0
