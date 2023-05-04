# Message Board App

Voici l'application MessageBoard, une application de chat en temps réel permettant aux utilisateurs de rejoindre des salons de discussion et d'échanger des messages avec d'autres utilisateurs.
Voici les fonctionnalités :

    - Inscription et sélection des utilisateurs
    - Création et sélection des salons
    - Échange de messages entre les utilisateurs
    - Stockage des sessions pour les données des utilisateurs et des salons

## Configuration

Pour configurer l'application, suivez ces étapes:

1. Clonez le dépôt sur votre machine :

```sh
git clone https://github.com/Khazeral/MessageBoardJS.git
cd MessageBoardJS
```

2. Installez les dépendances du projet pour les tests à l'aide de `npm` :

```sh
npm i
```

3. Installez `http-server` globalement à l'aide de `npm` :

```sh
npm install -g http-server
```

4. Démarrez le serveur de développement en exécutant la commande suivante à la racine du projet :

```sh
http-server
```

5. Ouvrez l'URL `http://localhost:8080`

## Tests

Pour exécuter les tests, exécuter cette commande :

```sh
npm test
```

Assurez-vous que le serveur de développement est en cours d'exécution avant d'exécuter les tests.

## Utilisation

1. Pour commencer à utiliser Message Board renseignez votre nom d'utilisateur dans le champ de saisie et le nom du salon.
2. Tapez votre message dans le champ de saisie et cliquez sur le bouton "Envoyer le message" ou appuyez sur Entrée pour envoyer votre message.
3. Visualisez les messages des autres utilisateurs en temps réel.
4. Cliquez sur le bouton "Snap Fingers like Thanos" pour effacer toutes les données de session et revenir à l'écran de création d'utilisateur.
