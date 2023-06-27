# Generated by Django 4.2.2 on 2023-06-24 13:50

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('title', models.CharField(max_length=200)),
                ('category_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('slug', models.SlugField(default=None)),
                ('icon', models.CharField(blank=True, default=None, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('discount', models.BooleanField(default=False)),
                ('image', models.ImageField(blank=True, default='', null=True, upload_to='img')),
                ('old_price', models.FloatField(default=100.0)),
                ('slug', models.SlugField(default=None)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('inventory', models.IntegerField(default=5)),
                ('top_deal', models.BooleanField(default=False)),
                ('flash_sales', models.BooleanField(default=False)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='storeapp.category')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='featured_product',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='featured_product', to='storeapp.product'),
        ),
    ]