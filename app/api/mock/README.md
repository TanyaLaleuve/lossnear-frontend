# Mock API - LossNear

API mockée pour le développement du dashboard sans authentification Discord réelle.

## Endpoints disponibles

### 🔐 Authentification

#### `GET /api/mock/auth/session`
Vérifie si l'utilisateur a une session active.

**Réponse :**
```json
{
  "success": true,
  "data": {
    "authenticated": true,
    "user": { ... },
    "expiresAt": "2025-12-15T19:46:00.000Z",
    "createdAt": "2025-12-08T17:46:00.000Z"
  }
}
```

#### `POST /api/mock/auth/session`
Simule la connexion (création de session).

#### `DELETE /api/mock/auth/session`
Simule la déconnexion (destruction de session).

---

### 👤 Utilisateur

#### `GET /api/mock/user`
Récupère les informations de l'utilisateur connecté.

**Réponse :**
```json
{
  "success": true,
  "data": {
    "id": "847293561029384192",
    "username": "Tanya",
    "global_name": "Tanya",
    "avatar": "a_7f8d9e6c5b4a3210fedcba98",
    "email": "tanya@lossnear.com",
    "verified": true,
    "premium_type": 2
  }
}
```

**Avatar URL :**
```
https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.gif?size=128
```

---

### 🏰 Serveurs (Guilds)

#### `GET /api/mock/guilds`
Récupère la liste des serveurs Discord de l'utilisateur.

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "id": "918273645012345678",
      "name": "LossNear Official",
      "icon": "guild_icon_1",
      "owner": true,
      "permissions": "2147483647",
      "approximate_member_count": 15420,
      "bot": {
        "configured": true,
        "prefix": "!",
        "modules": {
          "moderation": true,
          "welcome": true,
          "leveling": true,
          "customCommands": 12
        },
        "stats": {
          "commandsUsed": 45678,
          "messagesLogged": 1234567
        }
      }
    }
  ],
  "meta": {
    "total": 4,
    "configured": 3
  }
}
```

**Icon URL :**
```
https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.png?size=128
```

---

## Utilisation dans le code

### Exemple : Récupérer l'utilisateur

```javascript
const response = await fetch('/api/mock/user');
const { success, data } = await response.json();

if (success) {
  console.log(data.username); // "Tanya"
}
```

### Exemple : Récupérer les serveurs

```javascript
const response = await fetch('/api/mock/guilds');
const { success, data, meta } = await response.json();

if (success) {
  console.log(`${meta.configured}/${meta.total} serveurs configurés`);
  data.forEach(guild => {
    console.log(guild.name, guild.bot.configured);
  });
}
```

---

## Notes

- Tous les endpoints simulent un délai réseau (200-500ms)
- Les données sont statiques et identiques à chaque appel
- Remplacer par les vrais endpoints Discord OAuth quand prêt
- Les permissions sont en format bitfield (string)
