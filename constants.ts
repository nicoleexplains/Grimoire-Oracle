import type { Invocation, Oracle } from './types';

export const ORACLES: Oracle[] = [
  {
    name: 'Azrael, The Ancient',
    description: "An ancient and wise spirit oracle from the 'Heptameron'. Speaks with a mystical and somewhat enigmatic tone.",
    systemPrompt: `You are an ancient and wise spirit oracle from the 'Heptameron of Peter de Abano' and 'The Magus'. You possess deep knowledge of magical elements, angels, hours, ceremonies, and the occult philosophies described in these texts. Your name is Azrael, a spirit of wisdom. Respond to inquiries with an archaic, mystical, and somewhat enigmatic tone. Your knowledge is confined to the lore of the Heptameron, The Magus, and related occult philosophy. Be helpful but maintain your persona. Do not break character. Do not reveal you are an AI.`
  },
  {
    name: 'Francis Barrett, The Magus',
    description: "The spirit of the author of 'The Magus' himself. Instructs on Natural and Talismanic magic with a learned, spiritual tone.",
    systemPrompt: `You are Francis Barrett, author of 'The Magus'. You speak as a 19th-century occult philosopher and teacher. Your goal is to instruct the user on the principles of Natural Magic, Talismanic Magic, and the Celestial Intelligencer. You are rational, deeply spiritual, and caution against the misuse of these arts for vain or wicked purposes. Your knowledge is drawn from your preface and introductions in 'The Magus'. Maintain your persona as a learned guide. Do not break character or mention you are an AI.`
  },
  {
    name: 'Raphael, The Messenger',
    description: 'The Archangel of Mercury, whose domain is knowledge, science, and communication. Answers with direct, practical information.',
    systemPrompt: `You are the Archangel Raphael, a spirit of Mercury. Your domain is knowledge, science, communication, and healing. You answer questions related to the practical application of magic: the properties of planets, herbs, stones, the construction of talismans, and the specific conjurations for different days. Your tone is direct, knowledgeable, and helpful, but still celestial and slightly detached. You are here to reveal the mechanics of the universe as described in 'The Magus' and 'Heptameron'. Maintain your persona. Do not reveal you are an AI.`
  }
];


export const INVOCATIONS: Invocation[] = [
  {
    title: "An Invocation of the Good Spirits",
    text: `IN the name of the blessed and Holy Trinity, I do desire thee, strong, and mighty angels (here name the spirits you would have appear) that if it be the divine will of him who is called Tetragrammaton, &c. the holy God, the Father, that thou take upon thee some shape as best becometh thy celestial nature, and appear to us visibly here in this place, and answer our demands, in as far as we shall not transgress the bounds of the divine mercy and goodness, by requesting unlawful knowledge; but that thou wilt graciously shew us what things are most profitable for us to know and do to the glory and honour of his divine Majesty who liveth and reigneth, world without end. Amen.`
  },
  {
    title: 'A General Exorcism of the Spirits of the Air',
    text: `WE being made after the image of God, endued with power from God and made after his will, do exorcise you, by the most mighty and powerful name of God, El, strong and wonderful, (here name the spirit which is to appear,) and we command you by Him who spoke the word and it was done, and by all the names of God, and by the name Adonai, El, Elohim, Elohe, Zebaoth, Elion, Eserchie, Jah, Tetragrammaton, Sadai, Lord God Most High: we exorcise you, and powerfully command you that you forthwith appear unto us here before this circle in a fair human shape, without any deformity or tortuosity; come ye all such, because we command you by the name Yaw and Vau, which Adam heard and spoke; and by the name of God, Agla, which Lot heard, and was saved with his family; and by the name Joth, which Jacob heard from the angel wrestling with him, and was delivered from the hand of his brother Esau; and by the name Anaphexeton, which Aaron heard and spoke, and was made wise; and by the name Zebaoth, which Moses named, and all the rivers were turned into blood; and by the name Eserchie Oriston, which Moses named, and all the rivers brought forth frogs...`
  },
  {
    title: "The Conjuration of the Lord's Day",
    text: `I CONJURE and confirm upon you, ye strong and holy angels of God, in the name Adonai, Eye, Eye, Eya, which is he who was, and is, and is to come, Eye, Abray; and in the name Saday, Cados, Cados, sitting on high upon the cherubim; and by the great name of God himself, strong and powerful, who is exalted above all the heavens; Eye, Saraye, who created the world, the heavens, the earth, the sea, and all that in them is, in the first day, and sealed them with his holy name Phaa; and by the name of the angels who rule in the fourth heaven, and serve before the most mighty Salamia, an angel great and honourable; and by the name of his star, which is Sol, and by his sign, and by the immense name of the living God, and by all the names aforesaid, I conjure thee, Michael, O great angel! who art chief ruler of this day; and by the name Adonai, the God of Israel, I conjure thee, O Michael! that thou labour for me, and fulfil all my petitions according to my will and desire in my cause and business.`
  },
  {
    title: 'The Conjuration of Monday',
    text: `I CONJURE and confirm upon you, ye strong and good angels, in the name Adonay, Adonay, Adonay, Eie, Eie, Eie, Cados, Cados, Cados, Achim, Achim, Ja, Ja, Fortis, Ja, qui apparuis monte Sinai, cum glorificatione regis Adonay, Saday, Zebaoth, Anathay, Ya, Ya, Ya, Marinata, Abim, Jeia, qui maria creavit stagna & omnes aquas in secundo die, quasdam super coelos, & quosdam in terra. Sigillavit mare in alio nomine suo, & terminum, quam sibi posuit, non præter b t: & per nomina Angelorum, qui dominantur in primo exercitu, qui serviunt Orphaniel Angelo magno, precioso & honorato: & per nomen Stellæ, quæ est Luna: & per nomina prædicta, super te conjuro, scilicet Gabriel, qui es præpositus diei. Lunæ secundo quòd pro me labores & adimpleas, &c.`
  },
  {
    title: 'The Conjuration of Tuesday',
    text: `I CONJURE and call upon you, ye strong and good angels, in the names Ya, Ya, Ya; He, He, He; Va, Hy, Hy, Ha, Ha, Ha; Va, Va, Va; An, An, An; Aia, Aia, Aia; El, Ay, Elibra, Elohim, Elohim; and by the names of the high God, who hath made the sea and dry land, and by his word hath made the earth, and produced trees, and hath set his seal upon the planets, with his precious, honoured, revered and holy name; and by the name of the angels governing in the fifth house, who are subservient to the great angel Acimoy, who is strong, powerful, and honoured, and by the name of his star which is called Mars, I call upon thee, Samael, by the names above mentioned, thou great angel! who presides over the day of Mars, and by the name Adonai, the living and true God, that you assist me in accomplishing my labours, &c.`
  },
  {
    title: 'The Conjuration of Wednesday',
    text: `I CONJURE and call upon you, ye strong and holy angels, good and powerful, in a strong name of fear and praise, Ja, Adonay, Elohim, Saday, Saday, Saday; Eie, Eie, Eie; Asamie, Asamie; and in the name of Adonay, the God of Israel, who hath made the two great lights, and distinguished day from night for the benefit of his creatures; and by the names of all the discerning angels, governing openly in the second house before the great angel, Tetra, strong and powerful; and by the name of his star which is Mercury; and by the name of his seal, which is that of a powerful and honoured God; and I call upon thee, Raphael, and by the names above mentioned, thou great angel who presidest over the fourth day: and by the holy name which is written in the front of Aaron, created the most high priest, and by the names of all the angels who are constant in the grace of Christ, and by the name and place of Ammaluim, that you assist me in my labours, &c. &c.`
  },
  {
    title: 'The Conjuration of Thursday',
    text: `I CONJURE and confirm upon you, ye strong and holy angels, by the names Cados, Cados, Cados, Eschercie, Escherei, Eschercie, Hatim, Ya, strong founder of the worlds; Cantine, Jaym, Janic, Anic, Calbot, Sabbac, Berisay, Alnaym; and by the name Adonai, who created fishes and creeping things in the waters, and birds upon the face of the earth, flying towards heaven, in the fifth day; and by the names of the angels serving in the sixth host before Pastor, a holy angel, and a great and powerful prince and by the name of his star, which is Jupiter, and by the name of his seal, and by the name of Adonai, the great God, Creator of all things, and by the name of all the stars, and by their power and virtue, and by all the names aforesaid, I conjure thee, Sachiel, a great Angel, who art chief ruler of Thursday, that for me thou labour, &c.`
  },
  {
    title: 'The Conjuration of Friday',
    text: `I CONJURE and confirm upon you, ye strong and holy angels, by the names On, Hey, Heya, Ja, Je, Saday, Adonai, and in the name Sadai, who created four-footed beasts, and creeping things, and man, in the sixth day, and gave to Adam. power over all creatures; wherefore blessed be the name of the Creator in his place; and by the name of the angels serving in the third host, before Dagiel, a great angel, and a strong and powerful prince, and by the name of his star, which is Venus, and by his seal which is holy; and by all the names aforesaid, I conjure upon thee, Anael, who art the chief ruler this day, that thou labour for me, &c.`
  },
  {
    title: 'The Conjuration of Saturday',
    text: `I CONJURE and confirm upon you, Caphriel, or Cassiel, Machator, and Seraquiel, strong and powerful angels; and by the name Adonai, Adonai, Adonai; Eie, Eie, Eie; Acim, Acim, Acim; Cados, Cados; Ima, Ima, Ima; Salay, Ja, Sar, Lord and Maker of the World, who rested on the seventh day; and by him who of his good pleasure gave the same to be observed by the children of Israel throughout their generations, that they should keep and sanctify the same, to have thereby a good reward in the world to conic; and by the names of the angels serving in the seventh host, before Booel, a great angel, and powerful prince; and by the name of his star, which is Saturn; and by his holy seal, and by the names before spoken, I conjure upon thee, Caphriel, who art chief ruler of the seventh day, which is the Sabbath, that for me thou labour, &c. &c.`
  },
  {
    title: 'Benediction of Perfumes',
    text: `THE God of Abraham, God of Isaac, God of Jacob, bless here the creatures of these kinds, that they may fill up the power and virtue of their odours; so that neither the enemy nor any false imagination may be able to enter into them; through our Lord Jesus Christ, &c. Then sprinkle the same with holy water.`
  },
  {
    title: 'The Exorcism of Fire',
    text: `I EXORCISE thee, O thou creature of fire, by the only true God Jehovah, Adonai, Tetragrammaton, that forthwith thou cast away every phantasm from thee, that it shall do no hurt to any one. We beseech thee, O Lord, to bless this creature of fire, and sanctify it, so that it may be blessed to set forth the praise and glory of thy holy name, and that no hurt may be permitted to come to the exorciser or spectators; through our Lord Jesus Christ. Amen.`
  },
  {
    title: 'Oration upon putting on the Vesture',
    text: `ANOOR, Amacor, Amides, Theodonias, Anitor; by the merits of the angels, O Lord! I will put on the garment of salvation, that this which I desire I may bring to effect, through thee, the most holy Adonai, whose kingdom endureth for ever and ever. Amen.`
  },
  {
    title: 'A Prayer to God, to be said in the Circle',
    text: `AMORULE, Taneha, Latisten, Rabur, Teneba, Latisten, Escha, Aladia, Alpha and Omega, Leyste, Orision, Adonai; O most merciful heavenly Father! have mercy upon me, although a sinner; make appear the arm of thy power in me this day against these obstinate spirits, that 1, by thy will, may be made a contemplator of thy divine works, and may be illustrated with all wisdom, to the honour and glory of thy holy name. I humbly beseech thee, that these spirits which I call by thy judgment may be bound and constrained to come and give true and perfect answers to those things which I shall ask of them; and that they may do and declare those things unto us, which by me may be commanded of them, not hurting any creature, neither injuring or terrifying me or my fellows, nor hurting any other creature, and affrighting no man; and let them be obedient to those things which are required of them.`
  }
];
