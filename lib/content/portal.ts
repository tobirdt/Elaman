import type { Locale } from "@/lib/i18n";

/**
 * The portal's own strings, in both languages.
 *
 * Kept apart from the public content because the audiences are different: the
 * public pages address someone deciding whether to get in touch, these address
 * someone who already has an account and wants to be let in with as little
 * ceremony as possible. The tone is correspondingly plainer.
 *
 * Every refusal on the sign-in form says the same thing on purpose. "No such
 * account" and "wrong password" are two different answers, and offering both
 * tells anyone who asks which addresses are customers of ours.
 */
export type PortalContent = {
  metadata: {
    signIn: { title: string; description: string };
    invitation: { title: string; description: string };
    overview: { title: string; description: string };
  };
  /** Shown in the header, and as the last breadcrumb step. */
  navLabel: string;
  signIn: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    lead: string;
    /**
     * Titles the band that holds the form and the access note. Deliberately
     * not a repeat of the page title: `PageHeader` has already said where we
     * are, and saying it twice reads as a stutter rather than as structure.
     */
    section: { label: string; title: string };
    fields: { email: string; password: string };
    submit: string;
    submitting: string;
    /** The second step, once the password has been accepted. */
    totp: {
      eyebrow: string;
      title: string;
      lead: string;
      field: string;
      hint: string;
      submit: string;
      submitting: string;
      restart: string;
    };
    access: {
      label: string;
      title: string;
      body: string;
      contactLabel: string;
    };
    errors: {
      emailRequired: string;
      passwordRequired: string;
      codeRequired: string;
      rejected: string;
      codeUsed: string;
      locked: string;
      challengeExpired: string;
      unexpected: string;
    };
  };
  invitation: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    lead: string;
    /**
     * Titles the band. The address goes in `forAddress` below it, not in the
     * heading: a heading is a sentence, and an email address set at heading
     * size wraps across two lines and shouts at the reader.
     */
    section: { label: string; title: string };
    /** Names the account being set up. `{email}` is replaced. */
    forAddress: string;
    invalid: { title: string; body: string };
    steps: {
      authenticator: { title: string; body: string; secretLabel: string };
      password: { title: string; body: string };
    };
    fields: { password: string; confirm: string; code: string };
    submit: string;
    submitting: string;
    done: { title: string; body: string; signIn: string };
    errors: {
      passwordTooShort: string;
      passwordTooLong: string;
      passwordWhitespace: string;
      passwordIdentity: string;
      confirmMismatch: string;
      codeRequired: string;
      wrongCode: string;
      invalidToken: string;
      unexpected: string;
    };
  };
  overview: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    lead: string;
    account: {
      label: string;
      name: string;
      email: string;
      role: string;
      company: string;
      roles: { admin: string; customer: string };
    };
    signOut: string;
    pending: { label: string; title: string; body: string };
  };
};

const portalContent = {
  de: {
    metadata: {
      signIn: {
        title: "Anmeldung",
        description:
          "Zugang zum Elaman-Portal für Mitarbeitende und für Kunden mit freigegebenen Unterlagen.",
      },
      invitation: {
        title: "Konto einrichten",
        description: "Kennwort festlegen und Authenticator einrichten.",
      },
      overview: {
        title: "Portal",
        description: "Übersicht im Elaman-Portal.",
      },
    },
    navLabel: "Login",
    signIn: {
      breadcrumb: "Anmeldung",
      eyebrow: "Portal",
      title: "Anmeldung",
      lead: "Für Elaman-Mitarbeitende und für Kunden, denen Unterlagen freigegeben wurden.",
      section: {
        label: "Zugang",
        title: "Anmelden oder Zugang anfragen.",
      },
      fields: {
        email: "E-Mail-Adresse",
        password: "Kennwort",
      },
      submit: "Weiter",
      submitting: "Wird geprüft …",
      totp: {
        eyebrow: "Zweiter Schritt",
        title: "Bestätigungscode",
        lead: "Öffnen Sie Ihre Authenticator-App und geben Sie den aktuellen sechsstelligen Code ein.",
        field: "Sechsstelliger Code",
        hint: "Der Code wechselt alle 30 Sekunden.",
        submit: "Anmelden",
        submitting: "Wird angemeldet …",
        restart: "Neu beginnen",
      },
      access: {
        label: "Kein Zugang",
        title: "Konto anfragen",
        body: "Zugänge werden einzeln vergeben. Schreiben Sie uns kurz, wer Sie sind und für welches Unternehmen Sie arbeiten, dann prüfen wir das und melden uns.",
        contactLabel: "Zum Kontaktformular",
      },
      errors: {
        emailRequired: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
        passwordRequired: "Bitte geben Sie Ihr Kennwort ein.",
        codeRequired: "Bitte geben Sie den sechsstelligen Code ein.",
        rejected: "Anmeldung nicht möglich. Bitte prüfen Sie Ihre Eingaben.",
        codeUsed:
          "Dieser Code wurde bereits verwendet. Bitte warten Sie, bis die App den nächsten anzeigt.",
        locked:
          "Zu viele Versuche. Bitte warten Sie einige Minuten, bevor Sie es erneut versuchen.",
        challengeExpired:
          "Der Vorgang ist abgelaufen. Bitte melden Sie sich noch einmal an.",
        unexpected:
          "Die Anmeldung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.",
      },
    },
    invitation: {
      breadcrumb: "Konto einrichten",
      eyebrow: "Einladung",
      title: "Konto einrichten",
      lead: "Legen Sie Ihr Kennwort fest und verbinden Sie Ihre Authenticator-App. Beides ist für den Zugang erforderlich.",
      section: {
        label: "Einladung",
        title: "Zugang einrichten.",
      },
      forAddress: "Die Einladung gilt für {email}.",
      invalid: {
        title: "Einladung nicht gültig",
        body: "Dieser Link ist abgelaufen oder wurde bereits verwendet. Bitte wenden Sie sich an Ihre Ansprechperson bei Elaman, dann erhalten Sie eine neue Einladung.",
      },
      steps: {
        authenticator: {
          title: "Authenticator verbinden",
          body: "Scannen Sie den Code mit einer Authenticator-App, etwa Google Authenticator, Microsoft Authenticator oder 1Password.",
          secretLabel: "Zum Eintippen, falls das Scannen nicht möglich ist",
        },
        password: {
          title: "Kennwort festlegen",
          body: "Mindestens zwölf Zeichen. Eine Wortfolge, die Sie sich merken können, ist sicherer als ein kurzes Kennwort mit Sonderzeichen.",
        },
      },
      fields: {
        password: "Kennwort",
        confirm: "Kennwort wiederholen",
        code: "Code aus der App",
      },
      submit: "Konto einrichten",
      submitting: "Wird eingerichtet …",
      done: {
        title: "Konto ist eingerichtet",
        body: "Sie können sich jetzt mit Ihrer E-Mail-Adresse, Ihrem Kennwort und Ihrer Authenticator-App anmelden.",
        signIn: "Zur Anmeldung",
      },
      errors: {
        passwordTooShort: "Bitte verwenden Sie mindestens zwölf Zeichen.",
        passwordTooLong: "Bitte verwenden Sie höchstens 128 Zeichen.",
        passwordWhitespace: "Bitte verwenden Sie nicht nur Leerzeichen.",
        passwordIdentity:
          "Bitte verwenden Sie kein Kennwort, das Ihren Namen oder Ihre E-Mail-Adresse enthält.",
        confirmMismatch: "Die beiden Eingaben stimmen nicht überein.",
        codeRequired: "Bitte geben Sie den sechsstelligen Code aus der App ein.",
        wrongCode:
          "Der Code passt nicht. Bitte prüfen Sie, ob die App eingerichtet ist, und nehmen Sie den aktuell angezeigten Code.",
        invalidToken:
          "Dieser Link ist abgelaufen oder wurde bereits verwendet. Bitte fordern Sie eine neue Einladung an.",
        unexpected:
          "Das Konto konnte nicht eingerichtet werden. Bitte versuchen Sie es erneut.",
      },
    },
    overview: {
      breadcrumb: "Portal",
      eyebrow: "Portal",
      title: "Übersicht",
      lead: "Sie sind angemeldet.",
      account: {
        label: "Konto",
        name: "Name",
        email: "E-Mail",
        role: "Rolle",
        company: "Unternehmen",
        roles: {
          admin: "Elaman",
          customer: "Kunde",
        },
      },
      signOut: "Abmelden",
      pending: {
        label: "In Arbeit",
        title: "Was hier als Nächstes entsteht",
        body: "Unterlagen und Benutzerverwaltung folgen. Bis dahin ist diese Seite der Nachweis, dass Anmeldung und Sitzung tragen.",
      },
    },
  },
  en: {
    metadata: {
      signIn: {
        title: "Sign in",
        description:
          "Access to the Elaman portal for staff and for customers with released documents.",
      },
      invitation: {
        title: "Set up your account",
        description: "Choose a password and connect your authenticator.",
      },
      overview: {
        title: "Portal",
        description: "Overview in the Elaman portal.",
      },
    },
    navLabel: "Login",
    signIn: {
      breadcrumb: "Sign in",
      eyebrow: "Portal",
      title: "Sign in",
      lead: "For Elaman staff, and for customers to whom documents have been released.",
      section: {
        label: "Access",
        title: "Sign in, or ask for an account.",
      },
      fields: {
        email: "Email address",
        password: "Password",
      },
      submit: "Continue",
      submitting: "Checking …",
      totp: {
        eyebrow: "Second step",
        title: "Verification code",
        lead: "Open your authenticator app and enter the current six-digit code.",
        field: "Six-digit code",
        hint: "The code changes every 30 seconds.",
        submit: "Sign in",
        submitting: "Signing in …",
        restart: "Start again",
      },
      access: {
        label: "No access",
        title: "Request an account",
        body: "Access is granted individually. Tell us briefly who you are and which company you work for, and we will look into it and come back to you.",
        contactLabel: "To the contact form",
      },
      errors: {
        emailRequired: "Please enter your email address.",
        passwordRequired: "Please enter your password.",
        codeRequired: "Please enter the six-digit code.",
        rejected: "Sign-in failed. Please check your details.",
        codeUsed:
          "That code has already been used. Please wait for the app to show the next one.",
        locked: "Too many attempts. Please wait a few minutes before trying again.",
        challengeExpired: "This took too long. Please sign in again.",
        unexpected: "The sign-in could not be processed. Please try again.",
      },
    },
    invitation: {
      breadcrumb: "Set up your account",
      eyebrow: "Invitation",
      title: "Set up your account",
      lead: "Choose your password and connect your authenticator app. Both are required for access.",
      section: {
        label: "Invitation",
        title: "Set up your access.",
      },
      forAddress: "This invitation is for {email}.",
      invalid: {
        title: "Invitation not valid",
        body: "This link has expired or has already been used. Please contact your point of contact at Elaman and you will receive a new invitation.",
      },
      steps: {
        authenticator: {
          title: "Connect your authenticator",
          body: "Scan the code with an authenticator app such as Google Authenticator, Microsoft Authenticator or 1Password.",
          secretLabel: "To type in, if scanning is not possible",
        },
        password: {
          title: "Choose a password",
          body: "At least twelve characters. A sequence of words you can remember is safer than a short password with special characters.",
        },
      },
      fields: {
        password: "Password",
        confirm: "Repeat password",
        code: "Code from the app",
      },
      submit: "Set up account",
      submitting: "Setting up …",
      done: {
        title: "Your account is ready",
        body: "You can now sign in with your email address, your password and your authenticator app.",
        signIn: "To sign in",
      },
      errors: {
        passwordTooShort: "Please use at least twelve characters.",
        passwordTooLong: "Please use no more than 128 characters.",
        passwordWhitespace: "Please use more than spaces.",
        passwordIdentity:
          "Please do not use a password that contains your name or your email address.",
        confirmMismatch: "The two entries do not match.",
        codeRequired: "Please enter the six-digit code from the app.",
        wrongCode:
          "That code does not match. Please check that the app is set up and use the code it shows right now.",
        invalidToken:
          "This link has expired or has already been used. Please request a new invitation.",
        unexpected: "The account could not be set up. Please try again.",
      },
    },
    overview: {
      breadcrumb: "Portal",
      eyebrow: "Portal",
      title: "Overview",
      lead: "You are signed in.",
      account: {
        label: "Account",
        name: "Name",
        email: "Email",
        role: "Role",
        company: "Company",
        roles: {
          admin: "Elaman",
          customer: "Customer",
        },
      },
      signOut: "Sign out",
      pending: {
        label: "In progress",
        title: "What comes next here",
        body: "Documents and user management follow. Until then this page is the evidence that sign-in and session hold.",
      },
    },
  },
} satisfies Record<Locale, PortalContent>;

export function getPortalContent(locale: Locale): PortalContent {
  return portalContent[locale];
}
