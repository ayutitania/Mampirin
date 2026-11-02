<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('the admin login page is reachable for guests', function () {
    $this->get(route('admin.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Admin/Login'));
});

test('guests are redirected to the admin login page', function () {
    $this->get(route('admin.dashboard'))
        ->assertRedirect(route('admin.login'));

    $this->get(route('admin.articles.index'))
        ->assertRedirect(route('admin.login'));

    $this->get(route('admin.categories.index'))
        ->assertRedirect(route('admin.login'));

    $this->get(route('admin.submissions.index'))
        ->assertRedirect(route('admin.login'));
});

test('an admin can log in with the correct credentials', function () {
    $admin = User::factory()->create([
        'email' => 'admin@mampirin.test',
        'password' => 'mampirin123',
    ]);

    $this->post(route('admin.login.store'), [
        'email' => $admin->email,
        'password' => 'mampirin123',
    ])->assertRedirect(route('admin.dashboard'));

    $this->assertAuthenticatedAs($admin);
});

test('invalid credentials are rejected', function () {
    User::factory()->create([
        'email' => 'admin@mampirin.test',
        'password' => 'mampirin123',
    ]);

    $this->from(route('admin.login'))
        ->post(route('admin.login.store'), [
            'email' => 'admin@mampirin.test',
            'password' => 'password-salah',
        ])
        ->assertRedirect(route('admin.login'))
        ->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('the login form validates its inputs', function () {
    $this->post(route('admin.login.store'), [
        'email' => 'bukan-email',
        'password' => '',
    ])->assertSessionHasErrors(['email', 'password']);
});

test('an authenticated admin reaches the dashboard', function () {
    $admin = User::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
            ->has('stats')
            ->has('recentArticles')
        );
});

test('an authenticated admin can log out', function () {
    $admin = User::factory()->create();

    $this->actingAs($admin)
        ->post(route('admin.logout'))
        ->assertRedirect(route('admin.login'))
        ->assertSessionHas('success');

    $this->assertGuest();
});
