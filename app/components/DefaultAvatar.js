export default function DefaultAvatar({ username = "User" }) {
    // Récupère la première lettre du username
    const initial = username.charAt(0).toUpperCase();

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <defs>
                <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#1b91f1", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#b80099", stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <circle cx="64" cy="64" r="64" fill="url(#avatarGradient)" />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".35em"
                fill="white"
                fontSize="48"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                {initial}
            </text>
        </svg>
    );
}
