// Mock API - User endpoint
// GET /api/mock/user
// Simule la récupération des données utilisateur Discord après authentification

export async function GET() {
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 300));

    const mockUser = {
        id: "260185523203604490",
        username: "Tanya",
        discriminator: "0",
        global_name: "Tanya",
        avatar: "a_7f8d9e6c5b4a3210fedcba98",
        email: "tanya@lossnear.com",
        verified: true,
        locale: "fr",
        mfa_enabled: true,
        premium_type: 2, // Nitro
        public_flags: 256, // Early Verified Bot Developer
        flags: 256,
        banner: "banner_hash_123",
        accent_color: 11730954, // #B30099 (rose)
        avatar_decoration: null
    };

    return Response.json({
        success: true,
        data: mockUser
    });
}
