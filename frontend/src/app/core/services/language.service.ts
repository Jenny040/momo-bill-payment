import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'fr', name: 'Français', flag: '🇨🇮' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' }
  ];

  // All translations
  private translations: any = {
    // Navigation
    'nav.home': { en: 'Home', zu: 'Ekhaya', af: 'Tuis', sw: 'Nyumbani', fr: 'Accueil', ha: 'Gida', yo: 'Ile', ig: 'Ụlọ', tw: 'Fie', rw: 'Irugi' },
    'nav.bills': { en: 'Bills', zu: 'Izikweletu', af: 'Rekeninge', sw: 'Bili', fr: 'Factures', ha: 'Kuɗaɗe', yo: 'Owo-owo', ig: 'Ụgwọ', tw: 'Kaw', rw: 'Amadeni' },
    'nav.savings': { en: 'Savings', zu: 'Ukonga', af: 'Spaar', sw: 'Akiba', fr: 'Épargne', ha: 'Tari', yo: 'Ifowopamọ', ig: 'Nchekwa', tw: 'Akwatia', rw: 'Ubutoni' },
    'nav.budget': { en: 'Budget', zu: 'Isabelomali', af: 'Begroting', sw: 'Bajeti', fr: 'Budget', ha: 'Kasafin', yo: 'Isuna', ig: 'Ego mmefu', tw: 'Sikasɛm', rw: 'Ingengo' },
    'nav.settings': { en: 'Settings', zu: 'Izilungiselelo', af: 'Instellings', sw: 'Mipangilio', fr: 'Paramètres', ha: 'Saiti', yo: 'Eto', ig: 'Ntọala', tw: 'Nsesa', rw: 'Igenamiteri' },

    // Auth
    'auth.signIn': { en: 'Sign In', zu: 'Ngena', af: 'Teken In', sw: 'Ingia', fr: 'Se Connecter', ha: 'Shiga', yo: 'Wọle', ig: 'Banye', tw: 'Kɔ', rw: 'Injira' },
    'auth.getStarted': { en: 'Get Started', zu: 'Qala', af: 'Begin', sw: 'Anza', fr: 'Commencer', ha: 'Fara', yo: 'Bẹrẹ', ig: 'Bido', tw: 'Fiti', rw: 'Tangira' },
    'auth.logout': { en: 'Logout', zu: 'Phuma', af: 'Teken Uit', sw: 'Toka', fr: 'Déconnexion', ha: 'Fita', yo: 'Jade', ig: 'Pụọ', tw: 'Pue', rw: 'Sohoka' },
    'auth.noAccount': { en: 'No bank account required. Works with any MTN number.', zu: 'Akukho mabhange adingekayo. Isebenza nganoma iyiphi inombolo ye-MTN.', af: 'Geen bankrekening nodig. Werk met enige MTN-nommer.', sw: 'Hakuna akaunti ya benki inahitajika. Inafanya kazi na nambari yoyote ya MTN.', fr: 'Aucun compte bancaire requis. Fonctionne avec n\'importe quel numéro MTN.', ha: 'Babu asusin banki da ake buƙata. Yana aiki da kowace lambar MTN.', yo: 'Ko si iṣiro banki ti o nilo. Ṣiṣẹ pẹlu nọmba MTN eyikeyi.', ig: 'Ọ dịghị akaụntụ ụlọ akụ chọrọ. Na-arụ ọrụ na nọmba MTN ọ bụla.', tw: 'Mpo sika banki nhia. Ɛyɛ adwuma ne MTN nɔma biara.', rw: 'Nta ibanki isabwa. Ikora na numero iyo yose ya MTN.' },

    // Dashboard
    'dashboard.welcome': { en: 'Good morning, {{name}} 👋', zu: 'Sawubona, {{name}} 👋', af: 'Goeie more, {{name}} 👋', sw: 'Habari za asubuhi, {{name}} 👋', fr: 'Bonjour, {{name}} 👋', ha: 'Barka da safiya, {{name}} 👋', yo: 'E kaaro, {{name}} 👋', ig: 'Ụtụtụ ọma, {{name}} 👋', tw: 'Mema wo akye, {{name}} 👋', rw: 'Mwaramutse, {{name}} 👋' },
    'dashboard.subtitle': { en: "Here's your financial overview for September 2026", zu: "Nakhu ukubuka kwakho kwezimali zika-September 2026", af: "Hier is jou finansiële oorsig vir September 2026", sw: "Hapa ni muhtasari wako wa kifedha wa Septemba 2026", fr: "Voici votre aperçu financier pour septembre 2026", ha: "Ga takaitaccen bayanin kuɗin ku na Satumba 2026", yo: "Eyi ni akopọ owo rẹ fun Oṣu Kẹsan 2026", ig: "Nke a bụ nchịkọta ego gị maka Septemba 2026", tw: "Eyɛ wo sikasɛm nhwehwɛmu ma September 2026", rw: "Ubu ni urutonde rw'amafaranga yawe muri Nzeri 2026" },
    'dashboard.billsDue': { en: 'Bills Due', zu: 'Izikweletu Ezifanele', af: 'Rekeninge Verskuldig', sw: 'Bili Zinazodaiwa', fr: 'Factures à Payer', ha: 'Kuɗaɗen Da Ake Biya', yo: 'Owo-owo Ti O Tọ', ig: 'Ụgwọ Ndị Na-eru', tw: 'Kaw a Wɔbɛtua', rw: 'Amafaranga Yo Kwishyura' },
    'dashboard.totalSaved': { en: 'Total Saved', zu: 'Okongiwe Konke', af: 'Totaal Gespaar', sw: 'Jumla ya Akiba', fr: 'Total Épargné', ha: 'Jimlar Tari', yo: 'Lapapọ Ti a Fipamọ', ig: 'Ngụkọta Echekwara', tw: 'Nea Wɔakora', rw: 'Byose Byabitswe' },
    'dashboard.overdue': { en: 'Overdue', zu: 'Isewelle', af: 'Agterstallig', sw: 'Imechelewa', fr: 'En Retard', ha: 'An wuce lokaci', yo: 'Ti Pẹ', ig: 'Gafere oge', tw: 'Atwa', rw: 'Yarenze igihe' },
    'dashboard.monthlySpend': { en: 'Monthly Spend', zu: 'Ukusetshenziswa Kwanyanga zonke', af: 'Maandelikse Besteding', sw: 'Matumizi ya Mwezi', fr: 'Dépenses Mensuelles', ha: 'Kashewar Wata', yo: 'Inawo Oṣooṣo', ig: 'Mmefu Kwa Ọnwa', tw: 'Sikasɛm Ɔsrane', rw: 'Amafaranga Ya Mukwezi' },
    'dashboard.recentActivity': { en: 'Recent Activity', zu: 'Umsebenzi Wakamuva', af: 'Onlangse Aktiwiteit', sw: 'Shughuli za Hivi Karibuni', fr: 'Activité Récente', ha: 'Ayyukan Kwanan nan', yo: 'Iṣẹ Ṣiṣe Laipẹ', ig: 'Ọrụ Na-adịbeghị anya', tw: 'Nnwemmua Mprempren', rw: 'Ibikorwa Biheruka' },

    // Bills
    'bills.title': { en: 'Bills Management', zu: 'Ukuphathwa Kwezikweletu', af: 'Rekeninge Bestuur', sw: 'Usimamizi wa Bili', fr: 'Gestion des Factures', ha: 'Gudanar da Kuɗaɗe', yo: 'Iṣakoso Owo-owo', ig: 'Nlekọta Ụgwọ', tw: 'Kaw Nhwɛsoɔ', rw: 'Gucunga Amadeni' },
    'bills.pending': { en: 'Pending', zu: 'Kusalindile', af: 'Hangende', sw: 'Inasubiri', fr: 'En Attente', ha: 'Ana jira', yo: 'Ti Nduro', ig: 'Na-eche', tw: 'Retɔ', rw: 'Bitegereje' },
    'bills.paid': { en: 'Paid', zu: 'Ikhokhiwe', af: 'Betaal', sw: 'Imelipiwa', fr: 'Payé', ha: 'An biya', yo: 'Ti San', ig: 'Akwoo', tw: 'Tua', rw: 'Yishyuwe' },
    'bills.overdue': { en: 'Overdue', zu: 'Isewelle', af: 'Agterstallig', sw: 'Imechelewa', fr: 'En Retard', ha: 'An wuce lokaci', yo: 'Ti Pẹ', ig: 'Gafere oge', tw: 'Atwa', rw: 'Yarenze igihe' },
    'bills.payNow': { en: 'Pay Now', zu: 'Khokha Manje', af: 'Betaal Nou', sw: 'Lipa Sasa', fr: 'Payer Maintenant', ha: 'Biya Yanzu', yo: 'San Bayi', ig: 'Kwu Ugbu a', tw: 'Tua Seesei', rw: 'Kwishyura Nonaha' },
    'bills.addBill': { en: 'Add Bill', zu: 'Faka Isikweletu', af: 'Voeg Rekening By', sw: 'Ongeza Bili', fr: 'Ajouter une Facture', ha: 'Ƙara Kuɗi', yo: 'Fi Owo-owo Kun', ig: 'Tinye Ụgwọ', tw: 'Fa Kaw Ka Ho', rw: 'Ongeraho Amafaranga' },
    'bills.dueThisMonth': { en: 'Due This Month', zu: 'Okufanele Kuyo Inyanga', af: 'Verskuldig Hierdie Maand', sw: 'Inakamilika Mwezi Huu', fr: 'Dû Ce Mois', ha: 'Da Ake Biya Wannan Watàn', yo: 'Ti O Tọ Ni Oṣu Yi', ig: 'Ụgwọ Nke Ọnwa A', tw: 'Ɔsrane Yi', rw: 'Igihe Cyo Kwishyura Muri Uku Kwezi' },
    'bills.totalPaid': { en: 'Total Paid', zu: 'Okukhokhiwe Konke', af: 'Totaal Betaal', sw: 'Jumla ya Kulipiwa', fr: 'Total Payé', ha: 'Jimlar An Biya', yo: 'Lapapọ Ti A San', ig: 'Ngụkọta Akwụrụ', tw: 'Nea Wɔatua', rw: 'Byishyuwe Byose' },

    // Savings
    'savings.title': { en: 'Savings Pots', zu: 'Izimbiza Zokonga', af: 'Spaarpotte', sw: 'Vyungu vya Akiba', fr: 'Coffres d\'Épargne', ha: 'Tukwane Tari', yo: 'Iṣura Ifowopamọ', ig: 'Ite Nchekwa', tw: 'Akwatia Nkuku', rw: 'Ibyombo Byo Kubika' },
    'savings.totalSaved': { en: 'Total Saved', zu: 'Okongiwe Konke', af: 'Totaal Gespaar', sw: 'Jumla ya Akiba', fr: 'Total Épargné', ha: 'Jimlar Tari', yo: 'Lapapọ Ti a Fipamọ', ig: 'Ngụkọta Echekwara', tw: 'Nea Wɔakora', rw: 'Byose Byabitswe' },
    'savings.target': { en: 'Target', zu: 'Umgomo', af: 'Teiken', sw: 'Lengo', fr: 'Objectif', ha: 'Burin', yo: 'Ibi-afẹde', ig: 'Ihe Mgbaru Ọsọ', tw: 'Botae', rw: 'Intego' },
    'savings.progress': { en: 'Progress', zu: 'Inqubekela', af: 'Vordering', sw: 'Maendeleo', fr: 'Progrès', ha: 'Ci gaba', yo: 'Ilọsiwaju', ig: 'Ọganihu', tw: 'Nkɔso', rw: 'Iterambere' },
    'savings.create': { en: 'Create Pot', zu: 'Yenza Ibiza', af: 'Skep Pot', sw: 'Unda Chombo', fr: 'Créer un Coffre', ha: 'Ƙirƙiri Tukwane', yo: 'Ṣẹda Ikoko', ig: 'Mepụta Ite', tw: 'Bɔ Nkuku', rw: 'Kora Icyombo' },
    'savings.contribute': { en: 'Contribute', zu: 'Nikela', af: 'Dra By', sw: 'Changia', fr: 'Contribuer', ha: 'Ba da Gudummawa', yo: 'Ṣe Alabapin', ig: 'Nye Onyinye', tw: 'Boa', rw: 'Tangira' },
    'savings.groupSavings': { en: 'Group Savings', zu: 'Ukonga Kweqembu', af: 'Groep Spaar', sw: 'Akiba ya Kikundi', fr: 'Épargne de Groupe', ha: 'Tarin Rukuni', yo: 'Ifowopamọ Ẹgbẹ', ig: 'Nchekwa Otu', tw: 'Boa Ano Akwatia', rw: 'Ubutoni bw\'Itsinda' },

    // Budget
    'budget.title': { en: 'Budget & Spending', zu: 'Isabelomali Nokusetshenziswa', af: 'Begroting & Besteding', sw: 'Bajeti na Matumizi', fr: 'Budget et Dépenses', ha: 'Kasafin & Kashewa', yo: 'Isuna & Inawo', ig: 'Ego mmefu & Mmefu', tw: 'Sikasɛm & Nsɛ', rw: 'Ingengo & Amafaranga' },
    'budget.spent': { en: 'Spent', zu: 'Isetshenzisiwe', af: 'Bestee', sw: 'Imetumika', fr: 'Dépensé', ha: 'An kashe', yo: 'Ti Lo', ig: 'Emeela', tw: 'Atua', rw: 'Yakoreshejwe' },
    'budget.remaining': { en: 'Remaining', zu: 'Okusele', af: 'Oorblywend', sw: 'Iliyobaki', fr: 'Restant', ha: 'Ya rage', yo: 'Ti O Ku', ig: 'Fọdụrụ', tw: 'Aka', rw: 'Isigaye' },
    'budget.health': { en: 'Budget Health', zu: 'Impilo Yesabelomali', af: 'Begroting Gesondheid', sw: 'Afya ya Bajeti', fr: 'Santé du Budget', ha: 'Lafiyar Kasafin', yo: 'Ilera Isuna', ig: 'Ahụike Ego mmefu', tw: 'Sikasɛm Akwahosan', rw: 'Ubuzima bw\'Ingengo' },
    'budget.insights': { en: 'Spending Insights', zu: 'Imibono Yokusetshenziswa', af: 'Besteding Insigte', sw: 'Ufahamu wa Matumizi', fr: 'Aperçus des Dépenses', ha: 'Fahimtar Kashewa', yo: 'Awọn Oye Inawo', ig: 'Nghọta Mmefu', tw: 'Nteɛso Nsɛ', rw: 'Ibyavuye mu Koresha Amafaranga' },
    'budget.category': { en: 'Category', zu: 'Isigaba', af: 'Kategorie', sw: 'Kategoria', fr: 'Catégorie', ha: 'Rukuni', yo: 'Ẹka', ig: 'Otu', tw: 'Nkyekyem', rw: 'Icyiciro' },
    'budget.topCategory': { en: 'Top Category', zu: 'Isigaba Esiyingenye', af: 'Top Kategorie', sw: 'Kategoria Bora', fr: 'Catégorie Principale', ha: 'Rukunin Farko', yo: 'Ẹka Ti O Ga Julọ', ig: 'Otu Kachasị', tw: 'Nkyekyem a Ɛyɛ', rw: 'Icyiciro Cy\'ibanze' },
    'budget.dailyAverage': { en: 'Daily Average', zu: 'Isilinganiso Sansuku zonke', af: 'Daaglikse Gemiddelde', sw: 'Wastani wa Kila Siku', fr: 'Moyenne Quotidienne', ha: 'Matsakaitan Kullum', yo: 'Apapọ Ojoojumọ', ig: 'Nkezi Kwa Ụbọchị', tw: 'Da Biara Nkyɛn', rw: 'Urupapuro rwa Buri Munsi' },

    // Chatbot
    'chatbot.greeting': { en: 'Hi! I\'m your MoMo assistant. How can I help?', zu: 'Sawubona! Ngingumsizi wakho we-MoMo. Ngingakusiza ngani?', af: 'Hallo! Ek is jou MoMo-assistent. Hoe kan ek help?', sw: 'Hujambo! Mimi ni msaidizi wako wa MoMo. Ninaweza kukusaidia vipi?', fr: 'Bonjour ! Je suis votre assistant MoMo. Comment puis-je vous aider ?', ha: 'Sannu! Ni mataimakin ku ne na MoMo. Ta yaya zan taimaka?', yo: 'Kab o! Emi ni oluranlọwọ MoMo rẹ. Bawo ni MO ṣe le ran ọ lọwọ?', ig: 'Ndewo! Abụ m onye enyemaka MoMo gị. Kedu ka m ga-esi nyere gị aka?', tw: 'Akwaaba! Mene wo MoMo boafo. Sɛnea na metumi aboa wo?', rw: 'Muraho! Ndi umufasha wawe wa MoMo. Nigute nshobora kugufasha?' },

    // Settings
    'settings.title': { en: 'Settings', zu: 'Izilungiselelo', af: 'Instellings', sw: 'Mipangilio', fr: 'Paramètres', ha: 'Saiti', yo: 'Eto', ig: 'Ntọala', tw: 'Nsesa', rw: 'Igenamiteri' },
    'settings.language': { en: 'Language', zu: 'Ulimi', af: 'Taal', sw: 'Lugha', fr: 'Langue', ha: 'Harshe', yo: 'Ede', ig: 'Asụsụ', tw: 'Kasa', rw: 'Ururimi' },
    'settings.country': { en: 'Country', zu: 'Izwe', af: 'Land', sw: 'Nchi', fr: 'Pays', ha: 'Ƙasa', yo: 'Orilẹ-ede', ig: 'Obodo', tw: 'Ɔman', rw: 'Igihugu' },
    'settings.currency': { en: 'Currency', zu: 'Imali', af: 'Geldeenheid', sw: 'Sarafu', fr: 'Devise', ha: 'Kudin', yo: 'Owo', ig: 'Ego', tw: 'Sika', rw: 'Ifaranga' },
    'settings.notifications': { en: 'Notifications', zu: 'Izaziso', af: 'Kennisgewings', sw: 'Arifa', fr: 'Notifications', ha: 'Sanarwa', yo: 'Awọn Ifitonileti', ig: 'Ọkwa', tw: 'Ntoabɔ', rw: 'Imenyesha' },
    'settings.account': { en: 'Account', zu: 'I-akhawunti', af: 'Rekening', sw: 'Akaunti', fr: 'Compte', ha: 'Asusin', yo: 'Iṣiro', ig: 'Akaụntụ', tw: 'Konta', rw: 'Konti' },

    // Landing Page
    'landing.hero.title': { en: 'Manage bills, save for the future, track spending.', zu: 'Phatha izikweletu, yonga ikusasa, landelela ukusetshenziswa.', af: 'Bestuur rekeninge, spaar vir die toekoms, volg besteding.', sw: 'Simamia bili, weka akiba kwa siku zijazo, fuatilia matumizi.', fr: 'Gérez les factures, épargnez pour l\'avenir, suivez vos dépenses.', ha: 'Sarrafa kuɗaɗe, ajiye don gaba, bin diddigin kashewa.', yo: 'Ṣakoso awọn owo-owo, fipamọ fun ọjọ iwaju, tọpinpin inawo.', ig: 'Jikwa ụgwọ, chekwa maka ọdịnihu, soro mmefu.', tw: 'Hwɛ kaw, kora ma daakye, di nsɛ a wɔtua so.', rw: 'Gucunga amadeni, kubika ibintu, gukurikira amafaranga.' },
    'landing.hero.description': { en: 'MoMo Everyday Essentials is your all-in-one companion for South African households — powered by MTN MoMo, built for real life.', zu: 'I-MoMo Everyday Essentials iyingxenye yakho yonke emzini waseNingizimu Afrika — inikwe amandla yi-MTN MoMo, yakhelwe impilo yangempela.', af: 'MoMo Everyday Essentials is jou alles-in-een-metgesel vir Suid-Afrikaanse huishoudings — aangedryf deur MTN MoMo, gebou vir die werklike lewe.', sw: 'MoMo Essentials ni mwenzako wa kila kitu kwa kaya za Afrika Kusini — inaendeshwa na MTN MoMo, iliyoundwa kwa maisha halisi.', fr: 'MoMo Everyday Essentials est votre compagnon tout-en-un pour les ménages sud-africains — propulsé par MTN MoMo, construit pour la vie réelle.', ha: 'MoMo Everyday Essentials shine abokin ku na duka-ɗaya ga gidajen Afirka ta Kudu — mai ƙarfi ta MTN MoMo, an gina shi don rayuwa ta gaske.', yo: 'MoMo Everyday Essentials jẹ ẹlẹgbẹ rẹ gbogbo-ni-ọkan fun awọn idile South Africa — ti o ni agbara nipasẹ MTN MoMo, ti a ṣe fun igbesi aye gidi.', ig: 'MoMo Everyday Essentials bụ ebe niile gị maka ezinụlọ South Africa — nke MTN MoMo na-akwado, nke e wuru maka ezigbo ndụ.', tw: 'MoMo Everyday Essentials ne wo biribiara mu boafo ma South Africa afiefie — a MTN MoMo na hyɛ no den, a wɔasiesie ama abrabɔ pa.', rw: 'MoMo Everyday Essentials ni umufasha wawe w\'ibintu byose ku ngozi z\'Afurika y\'Epfo — ikoreshwa na MTN MoMo, yubatswe kugira ngo ibeho nyacyo.' },
    'landing.features.title': { en: 'Everything you need, nothing you don\'t', zu: 'Konke okudingayo, akukho ongakudingi', af: 'Alles wat jy nodig het, niks wat jy nie nodig het nie', sw: 'Kila kitu unachohitaji, hakuna usichohitaji', fr: 'Tout ce dont vous avez besoin, rien de superflu', ha: 'Duk abin da kuke buƙata, babu abin da ba ku buƙata', yo: 'Ohun gbogbo ti o nilo, ko si ohun ti o ko nilo', ig: 'Ihe niile ị chọrọ, ọ dịghị ihe ị na-achọghị', tw: 'Nea wohia nyinaa, nea wohia no', rw: 'Ibintu byose ukenera, nta utakeneye' },
    'landing.features.subtitle': { en: 'Designed for South African families managing everyday finances with MTN MoMo.', zu: 'Yenzelwe imindeni yaseNingizimu Afrika ephethe izimali zansuku zonke nge-MTN MoMo.', af: 'Ontwerp vir Suid-Afrikaanse gesinne wat daaglikse finansies met MTN MoMo bestuur.', sw: 'Imeundwa kwa ajili ya familia za Afrika Kusini zinazosimamia fedha za kila siku kwa MTN MoMo.', fr: 'Conçu pour les familles sud-africaines qui gèrent leurs finances quotidiennes avec MTN MoMo.', ha: 'An tsara shi don iyalin Afirka ta Kudu da ke sarrafa kuɗin yau da kullun tare da MTN MoMo.', yo: 'Ti a ṣe fun awọn idile South Africa ti n ṣakoso awọn inawo lojoojumọ pẹlu MTN MoMo.', ig: 'Emebere ya maka ezinụlọ South Africa na-achịkwa ego kwa ụbọchị na MTN MoMo.', tw: 'Wɔasiesie ama South Africa mmusua a wɔde MTN MoMo di wɔn daa sikasɛm ho dwuma.', rw: 'Yubatswe kugira ngo ifashe imiryango y\'Afurika y\'Epfo mu gucunga amafaranga ya buri munsi ikoresheje MTN MoMo.' }
  };

  constructor() {}

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  setLanguage(langCode: string) {
    const lang = this.languages.find(l => l.code === langCode);
    if (lang) {
      this.currentLang.next(langCode);
    }
  }

  t(key: string, params?: any): string {
    const lang = this.currentLang.value;
    let value = this.translations[key]?.[lang] || this.translations[key]?.['en'] || key;
    if (params && value) {
      Object.keys(params).forEach(param => {
        value = value.replace(`{{${param}}}`, params[param]);
      });
    }
    return value;
  }
}
