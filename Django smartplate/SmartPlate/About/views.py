from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def About(request):
    template = loader.get_template('About.html')
    return HttpResponse(template.render())