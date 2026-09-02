from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    ROLE_CHOICES = (
        ('farmer', 'Farmer'),
        ('buyer', 'Buyer'),
    )
    
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='buyer')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.role})"

class Crop(models.Model):
    farmer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name="crops")
    farmer_name = models.CharField(max_length=100, default="Farmer")
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price_per_kg = models.DecimalField(max_digits=10,decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.farmer.email})"
    
class Order(models.Model):
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='buyer_orders')
    farmer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='farmers_orders')
    crop_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.crop_name}"

class Logistics(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    tracking_number = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='In Transit')
    destination = models.CharField(max_length=255)

    def __str__(self):
        return f"Logistics #{self.tracking_number}"