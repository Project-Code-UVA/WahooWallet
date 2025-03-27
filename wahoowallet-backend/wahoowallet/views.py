from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def get_ai_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        prompt = data.get('prompt', '')

        #  Generate or retrieve some AI-based reply
        ai_answer = f"Hello from Django! You asked: {prompt}"

        return JsonResponse({'response': ai_answer})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def add_account(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        account_name = data.get('accountName', 'New Account')
        initial_balance = data.get('initialBalance', 0)
        
        # Here you’d create the new account in your DB
        # e.g., account = Account.objects.create(...)

        return JsonResponse({
            'message': 'Account successfully created!',
            'account': {
                'name': account_name,
                'balance': initial_balance,
            }
        })
    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def update_transaction_category(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        tx_id = data.get('transactionId')
        new_category = data.get('newCategory')

        # e.g. transaction = Transaction.objects.get(id=tx_id)
        # transaction.category = new_category
        # transaction.save()

        return JsonResponse({
            'message': 'Transaction category updated!',
            'transactionId': tx_id,
            'newCategory': new_category
        })
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def django_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        # ... do authentication checks ...
        # e.g., user = authenticate(request, username=username, password=password)
        # if user is None: return JsonResponse({'success': False, 'error': 'Invalid credentials'})
        return JsonResponse({'success': True, 'user': username})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def django_signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        # ... create user logic ...
        return JsonResponse({'success': True, 'user': username})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def update_username(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_username = data.get('username')
        # ... Update logic, e.g. request.user.username = new_username ...
        return JsonResponse({'message': 'Username updated', 'username': new_username})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def update_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_password = data.get('password')
        # ... Update logic ...
        return JsonResponse({'message': 'Password updated'})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def update_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_email = data.get('email')
        # ... Update logic ...
        return JsonResponse({'message': 'Email updated'})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def connect_grubhub(request):
    if request.method == 'POST':
        # ... Logic to link the user's account with GrubHub ...
        return JsonResponse({'message': 'GrubHub account connected!'})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)