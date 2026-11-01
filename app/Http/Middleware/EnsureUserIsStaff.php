<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsStaff
{
    // Hanya admin/editor yang aktif yang boleh membuka panel admin
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        abort_unless(
            $user && $user->is_active && in_array($user->role, ['admin', 'editor'], true),
            403
        );

        return $next($request);
    }
}
