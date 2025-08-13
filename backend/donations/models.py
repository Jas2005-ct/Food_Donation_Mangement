from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# donations/models.py
from django.db import models
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, user_type=None, **extra_fields):
        if not email:
            raise ValueError('Email must be provided')
        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, user_type='donor', **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not user_type:
            raise ValueError('Superusers must have a user_type.')
        return self.create_user(email, password, user_type=user_type, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = (
        ('donor', 'Donor'),
        ('ngo', 'NGO'),
    )
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES, null=False, blank=False, default='donor')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact_person = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)  # renamed to phone_number for consistency

    def __str__(self):
        return f"Donor: {self.user.email}"

class NGO(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"NGO: {self.organization_name}"



class Donation(models.Model):
    MEAL_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    ]

    donor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='donations')
    title = models.CharField(max_length=100)
    description = models.TextField()
    quantity = models.CharField(max_length=50)
    meal_type = models.CharField(max_length=10, choices=MEAL_CHOICES)
    pickup_location = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)
    image = models.ImageField(upload_to='donations/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Available')

    def __str__(self):
        # Change 'username' to 'email' to match your custom User model
        return f"{self.title} by {self.donor.email}" 