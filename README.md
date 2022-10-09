# WikiPlante-API

La création d'un compte est necessaire pour utiliser l'API WikiPlante 

CRUD USER :

    route pour crée un utilisateur :    http://localhost:8080/api/user/register          methode: Post
    route pour se connecter :           http://localhost:8080/api/user/login             methode: Post
    route pour se deconnecter :         http://localhost:8080/api/user/logout            methode: Get

    route pour avoir tout le utilisateur :       http://localhost:8080/api/user/            methode: Get
    route pour avoir un utilisateur :            http://localhost:8080/api/user:id          methode: Get
    route pour modifier un utilisateur :         http://localhost:8080/api/user:id          methode: Put
    route pour supprimer un utilisateur :        http://localhost:8080/api/user:id          methode: Delete


***Une fois connecté avec votre compte utilisateur, vous recevrez un token qui vous permetra d'acceder au CRUD plante ***

CRUD PLANTE : 


    route pour crée une plante            http://localhost:8080/api/plante            methode: Post
    route pour modifier une plante        http://localhost:8080/api/plante:id         methode: Put 
    route pour supprimer une plante       http://localhost:8080/api/plante:id         methode: Delete


    route pour avoir une plante                                http://localhost:8080/api/plante:id         methode: Get
    route pour avoir toutes les plantes                        http://localhost:8080/api/plante            methode: Get           
    routes pour avoir toutes les plantes d'un utilisateur      http://localhost:8080/api/plante/user:id    methode: Get

CD UPLOAD 

    route pour upload une image                                http://localhost:8080/api/plante/upload                methode: Post                      
    route pour supprimer une image                             http://localhost:8080/api/plante/upload/delete:id      methode: Delete                      



Format des donnée pour l'ajout d'un plante : 

    Genre : String : nom du genre en latin 

    espece : String : nom de l'éspèce, genre + espèce + cultivar ... en latin 

    nom_commun : String : nom vernaculaire en français 

    famille : String : famille en latin 

    ordre : String : nom de l'ordre en latin 

    port : String : type de port en 1 mot 

    couleur_floraison : String : couleur en 1 mot, prendre des couleurs simple

    couleur_feuillage : String : couleur en 1 mot, prendre des couleurs simple 

    periode_floraison : String : xxx-xxx  exemple: avril-mais (sans espace)

    description_feuillage: String : court texte focalisé sur la feuillage 

    description_floraison : String : court texte focalisé sur la floraison 

    description_fruit : String : court texte focalisé sur le fruit

    description : String : description général et ajout complaimentaire 

    exposition : String : choix entre : soleil,ombre,mi-ombre,noir total

    sol : String : à voir encore 


Format des donnée pour l'upload d'une image : 

    le filename doit être 'imagePlante'

    cible : String : la partie ciblié par la photo feuille / fleur / port / tronc / tige 


    





