from django.db import models

# Create your models here.
class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class AISuggestions(models.Model):
    suggestion_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    suggestion_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Budgets(models.Model):
    budget_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

class MealSwipes(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    meal_id = models.AutoField(primary_key=True)
    total_swipes = models.IntegerField()
    remaining_swipes = models.IntegerField()
    flex_dollars = models.DecimalField(max_digits=10, decimal_places=2)
    report_data = models.JSONField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['meal_id'], name='meal_id_unique'),
            models.CheckConstraint(check=models.Q(remaining_swipes__lte=models.F('total_swipes')), name='check_remaining_swipes')
        ]

class Reports(models.Model):
    report_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=50, null=True, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)
    report_data = models.JSONField()

class Transactions(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)