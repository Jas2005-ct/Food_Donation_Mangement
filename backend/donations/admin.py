# admin.py
from django.contrib import admin
from .models import User, Donor, NGO,Donation
from django.contrib.auth.admin import UserAdmin

admin.site.register(User)
admin.site.register(Donor)
admin.site.register(NGO)
admin.site.register(Donation)


