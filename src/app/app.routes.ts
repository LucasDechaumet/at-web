import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "stock",
        title: "SmartPinWeb - Stock",
        data: { title: "Stock" },
        loadComponent: () =>
          import("./pages/stock/stock.component").then((m) => m.StockComponent),
      },
      {
        path: "inventaire",
        title: "SmartPinWeb - Inventaire",
        data: { title: "Inventaire" },
        loadComponent: () =>
          import("./pages/inventaire/inventaire.component").then(
            (m) => m.InventaireComponent
          ),
      },
      {
        path: "mouvement",
        title: "SmartPinWeb - Mouvement",
        data: { title: "Mouvement" },
        loadComponent: () =>
          import("./pages/mouvement/mouvement.component").then(
            (m) => m.MouvementComponent
          ),
      },
      {
        path: "historique",
        title: "SmartPinWeb - Historique",
        data: { title: "Historique" },
        loadComponent: () =>
          import("./pages/historique/historique.component").then(
            (m) => m.HistoriqueComponent
          ),
      },
      {
        path: "reception/attendu",
        title: "SmartPinWeb - Réception En Attente",
        data: { title: "Réception En Attente" },
        loadComponent: () =>
          import("./pages/reception/attendu/attendu.component").then(
            (m) => m.AttenduComponent
          ),
      },
      {
        path: "reception/historique",
        title: "SmartPinWeb - Réception Historique",
        data: { title: "Réception Historique" },
        loadComponent: () =>
          import("./pages/reception/historique/historique.component").then(
            (m) => m.HistoriqueComponent
          ),
      },
      {
        path: "expedition",
        title: "SmartPinWeb - Expédition",
        data: { title: "Expédition" },
        loadComponent: () =>
          import("./pages/expedition/expedition.component").then(
            (m) => m.ExpeditionComponent
          ),
      },
      {
        path: "enlevement/attendu",
        title: "SmartPinWeb - Enlèvement En Attente",
        data: { title: "Enlèvement En Attente" },
        loadComponent: () =>
          import("./pages/enlevement/attendu/attendu.component").then(
            (m) => m.AttenduComponent
          ),
      },
      {
        path: "enlevement/historique",
        title: "SmartPinWeb - Enlèvement Historique",
        data: { title: "Enlèvement Historique" },
        loadComponent: () =>
          import("./pages/enlevement/historique/historique.component").then(
            (m) => m.HistoriqueComponent
          ),
      },
      {
        path: "remise-colis-web/attendu",
        title: "SmartPinWeb - Remise Colis Web En Attente",
        data: { title: "Remise Colis Web En Attente" },
        loadComponent: () =>
          import("./pages/remise-colis-web/attendu/attendu.component").then(
            (m) => m.AttenduComponent
          ),
      },
      {
        path: "remise-colis-web/historique",
        title: "SmartPinWeb - Remise Colis Web Historique",
        data: { title: "Remise Colis Web Historique" },
        loadComponent: () =>
          import("./pages/remise-colis-web/historique/historique.component").then(
            (m) => m.HistoriqueComponent
          ),
      },
      {
        path: "utilisateurs",
        title: "SmartPinWeb - Utilisateurs",
        data: { title: "Utilisateurs" },
        loadComponent: () =>
          import("./pages/utilisateurs/utilisateurs.component").then(
            (m) => m.UtilisateursComponent
          ),
      },
      {
        path: "acces",
        title: "SmartPinWeb - Gestion des Accès",
        data: { title: "Gestion des Accès" },
        loadComponent: () =>
          import("./pages/acces/acces.component").then((m) => m.AccesComponent),
      },
      {
        path: "parametres-generaux",
        title: "SmartPinWeb - Paramètres Généraux",
        data: { title: "Paramètres Généraux" },
        loadComponent: () =>
          import("./pages/parametres-generaux/parametres-generaux.component").then(
            (m) => m.ParametresGenerauxComponent
          ),
        children: [
          {
            path: "seuil-inventaire",
            title: "SmartPinWeb - Seuil Inventaire",
            data: { title: "Paramètres Généraux > Inventaire > Seuil" },
            loadComponent: () =>
              import(
                "./pages/parametres-generaux/components/seuil-inventaire/seuil-inventaire.component"
              ).then((m) => m.SeuilInventaireComponent),
          },
          {
            path: "param-algo",
            title: "SmartPinWeb - Paramètres Algorithmes",
            data: { title: "Paramètres Généraux > Inventaire > Algorithmes" },
            loadComponent: () =>
              import(
                "./pages/parametres-generaux/components/param-algo/param-algo.component"
              ).then((m) => m.ParamAlgoComponent),
          },
          {
            path: "motif-mouvement",
            title: "SmartPinWeb - Motif Mouvement",
            data: { title: "Paramètres Généraux > Mouvement > Motif" },
            loadComponent: () =>
              import(
                "./pages/parametres-generaux/components/motif-mouvement/motif-mouvement.component"
              ).then((m) => m.MotifMouvementComponent),
          },
        ],
      },
      {
        path: "demandes-pda",
        title: "SmartPinWeb - Demandes relatives aux PDA",
        data: { title: "Demandes relatives aux PDA" },
        loadComponent: () =>
          import("./pages/pda/demandes-pda/demandes-pda.component").then(
            (m) => m.DemandesPdaComponent
          ),
      },
      {
        path: "liste-pda",
        title: "SmartPinWeb - Liste des PDA",
        data: { title: "Liste des PDA" },
        loadComponent: () =>
          import("./pages/pda/liste-pda/liste-pda.component").then(
            (m) => m.ListePdaComponent
          ),
      },
      {
        path: "guide-utilisateur",
        title: "SmartPinWeb - Guide Utilisateur",
        data: { title: "Guide Utilisateur" },
        loadComponent: () =>
          import("./pages/guide-utilisateur/guide-utilisateur.component").then(
            (m) => m.GuideUtilisateurComponent
          ),
      },
      {
        path: "parametres",
        title: "SmartPinWeb - Paramètres",
        data: { title: "Paramètres" },
        loadComponent: () =>
          import("./pages/parametres/parametres.component").then(
            (m) => m.ParametresComponent
          ),
      },
    ],
  },
  {
    path: "login",
    title: "SmartPinWeb - Login",
    loadComponent: () =>
      import("./pages/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "reset-password",
    title: "SmartPinWeb - Reset Password",
    loadComponent: () =>
      import("./pages/reset-password/reset-password.component").then(
        (m) => m.ResetPasswordComponent
      ),
  },

  // Routes inconnues
  {
    path: "**",
    redirectTo: "login",
  },
];
