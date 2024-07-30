default_app_config = "saleor.product.app.ProductAppConfig"


class ProductMediaTypes:
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"

    CHOICES = [
        (IMAGE, "An uploaded image or an URL to an image"),
        (VIDEO, "A URL to an external video"),
    ]


class BookableResourceDay:
    MONDAY = "MONDAY"
    TUESDAY = "TUESDAY"
    WEDNESDAY = "WEDNESDAY"
    THURSDAY = "THURSDAY"
    FRIDAY = "FRIDAY"
    SATURDAY = "SATURDAY"
    SUNDAY = "SUNDAY"

    CHOICES = [
        (MONDAY, "Monday"),
        (TUESDAY, "Tuesday"),
        (WEDNESDAY, "Wednesday"),
        (THURSDAY, "Thursday"),
        (FRIDAY, "Fiday"),
        (SATURDAY, "Saturday"),
        (SUNDAY, "Sunday"),
    ]


class BookingStatus:
    CANCELED = "CANCELED"
    CONFIRMED = "CONFIRMED"
    PENDING = "PENDING"

    CHOICES = [
        (CANCELED, "Canceled"),
        (CONFIRMED, "Confirmed"),
        (PENDING, "Pending"),
    ]
