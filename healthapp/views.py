from django.shortcuts import render


#Redirect to the main view
def home_page(request):
    return render(request, 'index.html')
