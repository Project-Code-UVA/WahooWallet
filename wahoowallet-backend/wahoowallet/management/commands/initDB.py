import os
import json
from django.core.management.base import BaseCommand
from wahoowallet.models import AISuggestions, Budgets, MealSwipes, Reports, Transactions, Users

class Command(BaseCommand):
    help = 'Initialize the database using JSON data'

    def handle(self, *args, **kwargs):
        # Update path
        json_file_path = '../wahoowallet-sql/Database/WahooWalletDB.json'
        
        # Confirm file path
        if not os.path.exists(json_file_path):
            self.stderr.write(f"File not found: {os.path.abspath(json_file_path)}")
            return
        
        # Open JSON file
        with open(json_file_path, 'r') as f:
            data = json.load(f)

        # Load data
        for user in data.get('Users', []):
            Users.objects.update_or_create(
                user_id=user['user_id'],
                defaults={
                    'username': user['username'],
                    'email': user['email'],
                    'password_hash': user['password_hash'],
                    'created_at': user.get('created_at'),
                    'updated_at': user.get('updated_at'),
                }
            )

        for suggestion in data.get('AISuggestions', []):
            AISuggestions.objects.update_or_create(
                suggestion_id=suggestion['suggestion_id'],
                defaults={
                    'user_id': suggestion['user_id'],
                    'suggestion_text': suggestion['suggestion_text'],
                    'created_at': suggestion.get('created_at'),
                }
            )

        for budget in data.get('Budgets', []):
            Budgets.objects.update_or_create(
                budget_id=budget['budget_id'],
                defaults={
                    'user_id': budget['user_id'],
                    'category': budget['category'],
                    'amount': budget['amount'],
                    'start_date': budget['start_date'],
                    'end_date': budget['end_date'],
                }
            )

        for meal in data.get('MealSwipes', []):
            MealSwipes.objects.update_or_create(
                meal_id=meal['meal_id'],
                defaults={
                    'user_id': meal['user_id'],
                    'total_swipes': meal['total_swipes'],
                    'remaining_swipes': meal['remaining_swipes'],
                    'flex_dollars': meal['flex_dollars'],
                    'report_data': meal['report_data'],
                }
            )

        for report in data.get('Reports', []):
            Reports.objects.update_or_create(
                report_id=report['report_id'],
                defaults={
                    'user_id': report['user_id'],
                    'report_type': report.get('report_type'),
                    'generated_at': report.get('generated_at'),
                    'report_data': report['report_data'],
                }
            )

        for transaction in data.get('Transactions', []):
            Transactions.objects.update_or_create(
                transaction_id=transaction['transaction_id'],
                defaults={
                    'user_id': transaction['user_id'],
                    'category': transaction['category'],
                    'description': transaction['description'],
                    'amount': transaction['amount'],
                    'transaction_date': transaction.get('transaction_date'),
                }
            )

        self.stdout.write(self.style.SUCCESS("Database initialized successfully!"))
