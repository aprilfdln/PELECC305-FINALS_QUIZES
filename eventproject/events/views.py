from django.shortcuts import render
from django.shortcuts import render, redirect
from .forms import EventRegistrationForm

def register_event(request):
    if request.method == 'POST':
        form = EventRegistrationForm(request.POST)

        if form.is_valid():
            form.save()
            
            return render(request, 'events/success.html', {'message': 'Registration Successful!'})

    else:
        form = EventRegistrationForm()

    return render(request, 'events/register.html', {'form': form})