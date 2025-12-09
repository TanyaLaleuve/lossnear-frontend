// Mock API - Session endpoint
// GET /api/mock/auth/session
// Simule la vérification de session utilisateur

export async function GET() {
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 200));

    // Simule une session active
    const mockSession = {
        authenticated: true,
        user: {
            id: "847293561029384192",
            username: "Tanya",
            global_name: "Tanya",
            avatar: "a_7f8d9e6c5b4a3210fedcba98"
        },
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 jours
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // Il y a 2h
    };

    return Response.json({
        success: true,
        data: mockSession
    });
}

// POST /api/mock/auth/session
// Simule la création d'une session (login)
export async function POST() {
    await new Promise(resolve => setTimeout(resolve, 500));

    return Response.json({
        success: true,
        message: "Session créée avec succès",
        data: {
            authenticated: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    });
}

// DELETE /api/mock/auth/session
// Simule la destruction d'une session (logout)
export async function DELETE() {
    await new Promise(resolve => setTimeout(resolve, 300));

    return Response.json({
        success: true,
        message: "Session détruite avec succès"
    });
}
