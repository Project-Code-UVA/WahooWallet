# Generated by Django 5.1.5 on 2025-01-17 17:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password_hash', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transaction_date', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wahoowallet.users')),
            ],
        ),
        migrations.CreateModel(
            name='Reports',
            fields=[
                ('report_id', models.AutoField(primary_key=True, serialize=False)),
                ('report_type', models.CharField(blank=True, max_length=50, null=True)),
                ('generated_at', models.DateTimeField(auto_now_add=True)),
                ('report_data', models.JSONField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wahoowallet.users')),
            ],
        ),
        migrations.CreateModel(
            name='Budgets',
            fields=[
                ('budget_id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wahoowallet.users')),
            ],
        ),
        migrations.CreateModel(
            name='AISuggestions',
            fields=[
                ('suggestion_id', models.AutoField(primary_key=True, serialize=False)),
                ('suggestion_text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wahoowallet.users')),
            ],
        ),
        migrations.CreateModel(
            name='MealSwipes',
            fields=[
                ('meal_id', models.AutoField(primary_key=True, serialize=False)),
                ('total_swipes', models.IntegerField()),
                ('remaining_swipes', models.IntegerField()),
                ('flex_dollars', models.DecimalField(decimal_places=2, max_digits=10)),
                ('report_data', models.JSONField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wahoowallet.users')),
            ],
            options={
                'constraints': [models.UniqueConstraint(fields=('meal_id',), name='meal_id_unique'), models.CheckConstraint(condition=models.Q(('remaining_swipes__lte', models.F('total_swipes'))), name='check_remaining_swipes')],
            },
        ),
    ]
