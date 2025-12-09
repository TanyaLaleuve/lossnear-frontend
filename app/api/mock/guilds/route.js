// Mock API - Guilds endpoint
// GET /api/mock/guilds
// Simule la récupération des serveurs Discord de l'utilisateur

export async function GET() {
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 400));

    const mockGuilds = [
        {
            id: "918273645012345678",
            name: "LossNear Official",
            icon: "guild_icon_1",
            owner: true,
            permissions: "2147483647", // Administrator
            features: ["COMMUNITY", "NEWS", "VERIFIED", "PARTNERED"],
            approximate_member_count: 15420,
            approximate_presence_count: 3240,
            // Données spécifiques au bot LossNear
            bot: {
                configured: true,
                prefix: "!",
                modules: {
                    moderation: true,
                    welcome: true,
                    leveling: true,
                    music: false,
                    customCommands: 12
                },
                stats: {
                    commandsUsed: 45678,
                    messagesLogged: 1234567,
                    moderationActions: 234
                }
            }
        },
        {
            id: "192837465098765432",
            name: "Gaming Squad",
            icon: "guild_icon_2",
            owner: false,
            permissions: "8", // Administrator
            features: ["COMMUNITY", "WELCOME_SCREEN_ENABLED"],
            approximate_member_count: 2340,
            approximate_presence_count: 567,
            bot: {
                configured: true,
                prefix: "?",
                modules: {
                    moderation: true,
                    welcome: true,
                    leveling: false,
                    music: true,
                    customCommands: 5
                },
                stats: {
                    commandsUsed: 8901,
                    messagesLogged: 234567,
                    moderationActions: 45
                }
            }
        },
        {
            id: "564738291047382910",
            name: "Dev Community",
            icon: "guild_icon_3",
            owner: false,
            permissions: "32", // Manage Server
            features: ["COMMUNITY"],
            approximate_member_count: 890,
            approximate_presence_count: 123,
            bot: {
                configured: false,
                prefix: null,
                modules: null,
                stats: null
            }
        },
        {
            id: "738291047382910564",
            name: "Chill Zone",
            icon: null,
            owner: true,
            permissions: "2147483647",
            features: [],
            approximate_member_count: 45,
            approximate_presence_count: 12,
            bot: {
                configured: true,
                prefix: "!",
                modules: {
                    moderation: false,
                    welcome: true,
                    leveling: false,
                    music: false,
                    customCommands: 2
                },
                stats: {
                    commandsUsed: 234,
                    messagesLogged: 5678,
                    moderationActions: 3
                }
            }
        }
    ];

    return Response.json({
        success: true,
        data: mockGuilds,
        meta: {
            total: mockGuilds.length,
            configured: mockGuilds.filter(g => g.bot.configured).length
        }
    });
}
