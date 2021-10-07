const { Client } = require('pg')
const readline = require('readline')
const fs = require('fs')

function getClient() {
  const user = process.env.PGUSER || 'postgres'
  const host = process.env.PGHOST || 'localhost'
  const database = process.env.PGDATABASE || 'postgres'
  const password = process.env.PGPASSWORD || '12345'
  const port = parseInt(process.env.PGPORT) || 5432

  return new Client({
    user,
    host,
    database,
    password,
    port,
  })
}

function escapeId(str) {
  return `"${String(str).replace(/(["])/gi, '$1$1')}"`
}

function escapeStr(str) {
  return `'${String(str).replace(/(['])/gi, '$1$1')}'`
}

async function executeStatement(sql) {
  const client = getClient()

  try {
    await client.connect()

    const { rows } = await client.query(sql)

    if (rows == null) {
      return []
    }
    return rows
  } finally {
    await client.end()
  }
}

const schemaName = 'vtb'
const schemaNameAsId = escapeId(schemaName)

const usersTableName = 'users'
const usersTableNameAsId = escapeId(usersTableName)

const categoriesTableName = 'categories'
const categoriesTableNameAsId = escapeId(categoriesTableName)

const datasetsTableName = 'datasets'
const datasetsTableNameAsId = escapeId(datasetsTableName)

const supportedFormats = ['xml', 'csv', 'json']
const supportedTypes = ['int', 'text', 'string', 'boolean', 'number', 'date']

const words = [
  'делопроизводительниц',
  'субстанциональность',
  'заинтересованность',
  'гастроэнтерология',
  'священнослужитель',
  'шерстепрядильщица',
  'переформирование',
  'перефразирование',
  'перешпиговывание',
  'аксиоматичность',
  'ангидрогексозид',
  'армоконструкция',
  'аспектуальность',
  'биорассасывание',
  'взрывогенератор',
  'дерегулирование',
  'диацетонсорбоза',
  'изоборнилацетат',
  'карбамоиланилид',
  'картопостроение',
  'лизоплазмалоген',
  'мегестролацетат',
  'метилглутаконат',
  'метоксипсорален',
  'мирнообновленец',
  'монофтонгизация',
  'нафтофеноксазин',
  'небесталанность',
  'негигиеничность',
  'неподвластность',
  'нерешительность',
  'нитроаминофенол',
  'оксигександиаль',
  'онихохейлофагия',
  'панхроматизация',
  'плотиностроение',
  'поджигательница',
  'провиденциализм',
  'профессионалист',
  'пьезопоглощение',
  'ребросклеивание',
  'септентрионалин',
  'сталеплавильщик',
  'стружкоприемник',
  'суперсходимость',
  'телерадиотовары',
  'тепловыделитель',
  'фенилнитробутан',
  'флорианополисец',
  'хондродистрофия',
  'шахтоуправление',
  'шумопригодность',
  'электровибрация',
  'электролизерщик',
  'электроэлеватор',
  'энергоэнтропика',
  'этоксииндоленин',
  'авиамоделистка',
  'автоэкскаватор',
  'азациклопропен',
  'антропопсихизм',
  'ацетилморфолин',
  'ацетилоксиндол',
  'бескислотность',
  'брахиморфность',
  'выпотрашивание',
  'гальванохромия',
  'гексацианоэтан',
  'гироинтегратор',
  'десметилкодеин',
  'диаминоакридон',
  'динитрофлуоран',
  'диоксигексацен',
  'заморененность',
  'изоантрафлавин',
  'имяобразование',
  'каплеуказатель',
  'кортикализация',
  'лимфоцитаферез',
  'лугомелиорация',
  'макроположение',
  'микропедиатрия',
  'нейротропность',
  'непоседливость',
  'несокрушимость',
  'нитродиаммофос',
  'нитромезитилен',
  'отсортирование',
  'параллаксометр',
  'пенобетоньерка',
  'перегримировка',
  'пероксосульфат',
  'пикоксистробин',
  'предкоксование',
  'продовольствие',
  'рекуператорщик',
  'рентгеноморфоз',
  'самостимуляция',
  'сансальвадорец',
  'сверхмарафонец',
  'северобайкалец',
  'слабовольность',
  'сульфоалюминат',
  'телеаудиоцентр',
  'тринитрокрезол',
  'управительница',
  'ферроактинолит',
  'формоочертание',
  'цветорассеяние',
  'четырехногость',
  'щитообразность',
  'экономсоветник',
  'азоксистробин',
  'аллохроматизм',
  'алюмомолибдат',
  'антрополатрия',
  'бактериофобия',
  'бензоиланизил',
  'видеопроектор',
  'врангелевщина',
  'вятскополянец',
  'гастероталамы',
  'гемисинеклиза',
  'гидразогруппа',
  'гидрогеосфера',
  'гидромеханизм',
  'гиперурикемия',
  'глюколютеолин',
  'глюкуронидаза',
  'горьковедение',
  'графитировщик',
  'десятиголосие',
  'дибензостибол',
  'диоксазиндион',
  'желобоватость',
  'императорство',
  'искательность',
  'капиллярность',
  'карбоксамидин',
  'квазивращение',
  'квазиконтракт',
  'колибактериоз',
  'криоатмосфера',
  'макроакустика',
  'метилгептанон',
  'метоксихалкон',
  'многомужество',
  'нахлестывание',
  'немедленность',
  'неосхоластика',
  'неплательщица',
  'никельсмарагд',
  'никельциппеит',
  'нитрохиндолин',
  'нуклеопротеид',
  'октилкарбинол',
  'отмораживание',
  'перемётывание',
  'перенумерация',
  'подстёгивание',
  'полимераналог',
  'правомерность',
  'предвозвестие',
  'прищёлкивание',
  'прокомпсогнат',
  'резидентность',
  'самопокорение',
  'светокультура',
  'светопередача',
  'своекорыстное',
  'системотехник',
  'сказковедение',
  'складничество',
  'сокольничанин',
  'сокораздатчик',
  'стигматофилия',
  'субконтрагент',
  'трибоэлектрет',
  'триоксофосфат',
  'трифторацетон',
  'тяжелораненый',
  'фенилсилоксан',
  'фронтирование',
  'хипенгиофобия',
  'хлоризопропил',
  'хозяйничество',
  'экофизиология',
  'электрогитара',
  'эпиактивность',
  'эритробластоз',
  'этилизоцианат',
  'этилпропиноат',
  'австриомания',
  'автоподзавод',
  'альдопентоза',
  'амилмочевина',
  'аммонийность',
  'ангиосаркома',
  'антискабиота',
  'аутоаллерген',
  'ацетанизидид',
  'бромбутаналь',
  'бугорчатость',
  'веделолактон',
  'везикостомия',
  'выбалтывание',
  'гастеральгия',
  'гетероэпитоп',
  'гипергаплоид',
  'голосимфазис',
  'гомотропилий',
  'дезустановка',
  'дексразоксан',
  'диазафлуорен',
  'дихлорэтанол',
  'заклевывание',
  'изотрегалоза',
  'индульгенция',
  'интерполяция',
  'карбоцистеин',
  'кельменчанка',
  'куртуазность',
  'кутуликчанка',
  'лаврентьевит',
  'лесотаксатор',
  'лесоторговля',
  'маннопротеин',
  'метанефридий',
  'многосложник',
  'модерантисты',
  'моллирование',
  'народоправие',
  'неонатология',
  'новокрещенка',
  'нормировщица',
  'опалесценция',
  'освобождение',
  'палеоталамус',
  'пиргоцефалия',
  'планировщица',
  'плантография',
  'пневмоподача',
  'подвахтенный',
  'поддоминанта',
  'подневольная',
  'подпаливание',
  'полирибосома',
  'политическая',
  'полублизость',
  'приращивание',
  'проваливание',
  'проктостеноз',
  'пронюхивание',
  'пучеглазость',
  'пылезаслонка',
  'радионаводка',
  'раскряжевщик',
  'саудоаравиец',
  'скотомизация',
  'совокупление',
  'спецкладбище',
  'стереооттиск',
  'супералгебра',
  'суперлимузин',
  'сцинтилляция',
  'терможилетка',
  'топогеохимия',
  'торосистость',
  'феллодендрон',
  'фотоэмульсия',
  'хлорфосфазен',
  'хронотерапия',
  'цефалоспорин',
  'штральзундец',
  'эгитогнатизм',
  'эндосимбионт',
  'эпиграфистка',
  'этиленопласт',
  'этиленфосфат',
  'акупрессура',
  'антионкоген',
  'астробиолог',
  'березанскит',
  'бластуляция',
  'ботриолепис',
  'бромпиридин',
  'бурсография',
  'бутениламин',
  'бутиллактат',
  'видеовопрос',
  'видеопленка',
  'виндсерфинг',
  'вываживание',
  'выигрывание',
  'гибралтарец',
  'гидропланаж',
  'гидропланка',
  'гидротерпен',
  'гипсометрия',
  'глоссомания',
  'десмарестия',
  'диалкилцинк',
  'диамидоэтан',
  'дибромметан',
  'дилетантизм',
  'дроспиренон',
  'зоопланктон',
  'изоникотеин',
  'исправление',
  'исцелимость',
  'йоттаньютон',
  'канниццарит',
  'катакустика',
  'лесоделянка',
  'лидертафель',
  'магнитодиск',
  'мамасахлиси',
  'мегалофобия',
  'мегапродажа',
  'мегацефалия',
  'медвежатина',
  'микрофизика',
  'монголистка',
  'моноаммоний',
  'мономорфизм',
  'мотогонщица',
  'нонилхлорид',
  'обломовщина',
  'окспренолол',
  'окулометрия',
  'омыляемость',
  'органосмесь',
  'паркинсонит',
  'пищеварение',
  'пневматурия',
  'подпяточник',
  'подсолнушек',
  'полиспермия',
  'политикофоб',
  'постпозиция',
  'прегнандион',
  'прилепчанин',
  'причисление',
  'приштуковка',
  'проскомидия',
  'рассуждение',
  'ревелантист',
  'самогонщица',
  'саркоколлин',
  'сверхжертва',
  'септемвират',
  'синтонность',
  'скорочтение',
  'сольватация',
  'соозначение',
  'соумышление',
  'спирометрия',
  'спленология',
  'стекломания',
  'стратфордец',
  'сульфоуреид',
  'табличность',
  'термокамера',
  'толстолобик',
  'торгашество',
  'тригемиобол',
  'тэзебазарец',
  'фенилпропан',
  'фенилхроман',
  'филлокладий',
  'филокартист',
  'фтороцитрат',
  'хромдиопсид',
  'циклораспад',
  'цинкохромит',
  'чаеторговец',
  'эвапорометр',
  'эмбриология',
  'авитаминоз',
  'автоколесо',
  'автотуризм',
  'актинограф',
  'аллотропия',
  'астрохимия',
  'багрильщик',
  'бегемотник',
  'бифлавонил',
  'блефование',
  'вазостомия',
  'вальпромид',
  'верховажец',
  'ветродуиха',
  'вковывание',
  'вызнавание',
  'высокоплан',
  'галлофобия',
  'гамадриады',
  'гастроцель',
  'генрикисты',
  'гетерохром',
  'госграница',
  'дементофоб',
  'децизиверт',
  'диалектика',
  'дискартроз',
  'желтогузка',
  'здоровячка',
  'златогузка',
  'зубристика',
  'иммунотест',
  'индантрион',
  'индексация',
  'инспектура',
  'камеролаит',
  'камнебетон',
  'канцелярия',
  'квадруплет',
  'кинестетик',
  'клизопомпа',
  'коагулятор',
  'когнатство',
  'командорец',
  'копремезис',
  'куровчанин',
  'лепидозавр',
  'лимфопатия',
  'ложкомойка',
  'льноуборка',
  'миллигамма',
  'мусаватист',
  'мыслеобраз',
  'назревание',
  'начинающая',
  'нектаронос',
  'никотинизм',
  'облуктация',
  'одичалость',
  'оксопролин',
  'ортодиазин',
  'отвергание',
  'пальмипеды',
  'паратрофия',
  'парфюмерия',
  'педагогика',
  'педпроцесс',
  'первосмысл',
  'половинщик',
  'полубархат',
  'полуфарфор',
  'прогастрин',
  'прогнозист',
  'продольник',
  'пролиферин',
  'психрограф',
  'пустошанка',
  'раховчанин',
  'ритмопачка',
  'секограмма',
  'селепровод',
  'синхондроз',
  'сквознячок',
  'смольнянка',
  'совладелец',
  'солдатушка',
  'состыковка',
  'старшиниха',
  'стрельбище',
  'сульфоэфир',
  'сысертскит',
  'сюжетность',
  'тайноречие',
  'таксифолин',
  'теплонасос',
  'тербуметон',
  'тестология',
  'тиатриазин',
  'тионфосфит',
  'тиоселенат',
  'тренировка',
  'трехиспора',
  'уголовщица',
  'ферроценил',
  'фикохромин',
  'филателизм',
  'фоторельеф',
  'фототрофия',
  'фритчиелла',
  'фугасность',
  'хаэтофобия',
  'хининдолин',
  'хлебородие',
  'хозединица',
  'циприсовые',
  'чермозянка',
  'шарлычанка',
  'шубниковит',
  'электроцех',
  'эмеральдин',
  'эмчеэсовец',
  'энергоузел',
  'этилбромид',
  'авенацеин',
  'агропункт',
  'адъюрация',
  'актинофаг',
  'алмалыкец',
  'альбатрос',
  'амфиболит',
  'апоцинхен',
  'ареопагит',
  'асемболия',
  'афтиталит',
  'биоклимат',
  'биочистка',
  'бисексуал',
  'бортсумка',
  'водоверть',
  'водополье',
  'водоприем',
  'вытравщик',
  'гамбургер',
  'гасслерин',
  'гаулейтер',
  'гемеролоп',
  'геогонист',
  'голотопия',
  'гуджарати',
  'дантролен',
  'деаэратор',
  'демивиерж',
  'дерновище',
  'джинистан',
  'диводород',
  'дилижанец',
  'динопрост',
  'евстахиит',
  'животинка',
  'заказчица',
  'избежание',
  'имязвучие',
  'индюшонок',
  'йодгидрин',
  'йоктометр',
  'каламенок',
  'камфаугит',
  'карнегиит',
  'кваркенец',
  'киберпанк',
  'колофонит',
  'корнеслов',
  'косильщик',
  'креднерит',
  'криоагент',
  'кроцидизм',
  'ксантофоб',
  'кунградец',
  'лопатинец',
  'люциферит',
  'мальсекко',
  'матрадура',
  'медазепам',
  'мещерячка',
  'мизология',
  'микрошпон',
  'миньярдиз',
  'моноклиза',
  'монолупин',
  'моноподия',
  'мустешары',
  'наурзумец',
  'никелянка',
  'ночлежник',
  'облысение',
  'обмеление',
  'обрубание',
  'оксопиран',
  'оплывание',
  'отография',
  'палиндром',
  'парашютик',
  'патыночек',
  'пауфлерит',
  'пахифитум',
  'периодика',
  'петрограф',
  'плоскорез',
  'подбортик',
  'подкраска',
  'покорение',
  'полисахар',
  'помиферин',
  'порторико',
  'поселянка',
  'почемучка',
  'появление',
  'прогнатия',
  'проклепка',
  'психотроп',
  'пуританин',
  'расклепка',
  'ребятёнок',
  'резвунчик',
  'сальвинин',
  'сахалинец',
  'свидетель',
  'сгребание',
  'сезонница',
  'селениаты',
  'сивапитек',
  'скрофулез',
  'сороковая',
  'спидометр',
  'сфеноптер',
  'теофиллин',
  'тетраполь',
  'токайское',
  'трубостав',
  'трудармия',
  'туполобие',
  'туробъект',
  'тюкование',
  'фенформин',
  'флогоскоп',
  'флуазурон',
  'формовщик',
  'хронаксия',
  'чемеровец',
  'чепечница',
  'шопомания',
  'штучность',
  'эзотеризм',
  'экзофилия',
  'эскимоска',
  'эхинопсин',
  'аббатиса',
  'агаповец',
  'агитация',
  'адинамия',
  'акролиты',
  'алкадиен',
  'ансамбль',
  'апостроф',
  'арагонка',
  'артистка',
  'аутистка',
  'бедемунд',
  'биметрия',
  'бишкекец',
  'борнезит',
  'бутиобат',
  'верденец',
  'волгарка',
  'вольтоль',
  'галланил',
  'герцметр',
  'гидролиз',
  'гийменит',
  'гиротрон',
  'глутамил',
  'гюбнерит',
  'дигиноза',
  'добрееит',
  'дредноут',
  'дюралайт',
  'жалкость',
  'изофилия',
  'кальманг',
  'канадоль',
  'капризун',
  'квартник',
  'кедайнец',
  'килолюкс',
  'китаевед',
  'клацанье',
  'клопомор',
  'котласец',
  'кругозор',
  'литотека',
  'любомудр',
  'маздеист',
  'малоросс',
  'маммоген',
  'мегалюкс',
  'метаглиф',
  'метроман',
  'моггарим',
  'мононить',
  'мурыжево',
  'недозвон',
  'незнайка',
  'нефелион',
  'нефометр',
  'нитрозол',
  'ночёвщик',
  'обмазчик',
  'обрепция',
  'пакотиль',
  'пармелия',
  'пастушка',
  'пахатник',
  'пензенец',
  'пензенка',
  'пенность',
  'пентатон',
  'плешивый',
  'плёточка',
  'подлещик',
  'поликрат',
  'полипиты',
  'полулист',
  'постылый',
  'препуций',
  'преснота',
  'приличие',
  'промельк',
  'проспект',
  'пятнание',
  'раджасуя',
  'разлитие',
  'ревнивец',
  'репортер',
  'ретророк',
  'роспуски',
  'саркофаг',
  'снесение',
  'сожжение',
  'спинакер',
  'спленома',
  'стандарт',
  'стрейнер',
  'струнщик',
  'схожесть',
  'талнахец',
  'тевризец',
  'текстура',
  'тетралин',
  'томограф',
  'торичник',
  'трахеола',
  'трикотаж',
  'трифеиты',
  'тунгуска',
  'туфолава',
  'убывание',
  'фактолог',
  'ферулоил',
  'фталофос',
  'фторимид',
  'фундация',
  'ханкинец',
  'харкунья',
  'хемотрон',
  'хлебница',
  'хлебушко',
  'хлорофан',
  'хризорин',
  'цвынтарь',
  'центурия',
  'чаепийца',
  'шелковьё',
  'шестовой',
  'шихтплац',
  'эпициста',
  'юнофобия',
  'агнатия',
  'америка',
  'аммотол',
  'аэротоп',
  'берёста',
  'боренье',
  'букерша',
  'бурелет',
  'варикап',
  'вибриоз',
  'высевка',
  'гомстед',
  'детинка',
  'дженнет',
  'диеноил',
  'дипкупе',
  'доделка',
  'долюшка',
  'замашка',
  'записка',
  'зеленца',
  'златник',
  'игрушка',
  'измолот',
  'изоперм',
  'имплант',
  'каранкс',
  'кассоне',
  'катетер',
  'квинтан',
  'кольник',
  'кумарон',
  'локалии',
  'локаята',
  'лущевка',
  'маиоран',
  'малышок',
  'масонка',
  'мертвое',
  'моурави',
  'моццета',
  'написты',
  'ньювера',
  'обрядка',
  'окраска',
  'оофагия',
  'оротрон',
  'паразит',
  'пардуны',
  'парнище',
  'передок',
  'пестряк',
  'пимозид',
  'пиокист',
  'пировец',
  'писарша',
  'полёвка',
  'реторта',
  'рибстул',
  'роменец',
  'роудбук',
  'рупташи',
  'сборище',
  'селахия',
  'селинан',
  'сетевик',
  'сиамуаз',
  'синофоб',
  'сиртаки',
  'скаккит',
  'социаты',
  'стоялец',
  'стратиг',
  'схоларх',
  'сюзерен',
  'тазомер',
  'тартана',
  'тремоло',
  'трепало',
  'тубанты',
  'фастбэк',
  'фожазит',
  'фурилен',
  'царишка',
  'циндики',
  'циновка',
  'циприна',
  'часовой',
  'экстази',
  'экстерн',
  'эллисит',
  'эмбенец',
  'юркость',
  'агирты',
  'агната',
  'аджика',
  'аллиин',
  'анакре',
  'анилин',
  'асофия',
  'асхабы',
  'ателоп',
  'бедеат',
  'бинфэй',
  'братан',
  'бризер',
  'бухунд',
  'варвар',
  'вмятие',
  'вязник',
  'габиан',
  'газета',
  'гермин',
  'гренок',
  'грумер',
  'гуеоко',
  'допант',
  'другое',
  'дуодец',
  'дуплет',
  'изафет',
  'имечко',
  'инфект',
  'иралия',
  'кальян',
  'кашрут',
  'киркат',
  'кокиль',
  'коксит',
  'кошнай',
  'крынка',
  'латырь',
  'лернеи',
  'липпия',
  'локоть',
  'лужина',
  'луфарь',
  'лыжник',
  'мардер',
  'махизм',
  'миозит',
  'миссия',
  'наилок',
  'ночник',
  'оморва',
  'отврат',
  'патала',
  'пежина',
  'платно',
  'платёж',
  'помело',
  'пуэбло',
  'рубато',
  'сальце',
  'сисаль',
  'солдат',
  'спящая',
  'стилет',
  'стосил',
  'сферия',
  'тангут',
  'терьяк',
  'торакс',
  'урамил',
  'фашион',
  'фургон',
  'хлорин',
  'хлорка',
  'ходьба',
  'цебаот',
  'чанбин',
  'шпанка',
  'абиоз',
  'абмад',
  'абуна',
  'борть',
  'бочаг',
  'брада',
  'вальс',
  'верес',
  'взмет',
  'волос',
  'выпад',
  'гелит',
  'гопак',
  'долма',
  'доула',
  'идеал',
  'квест',
  'краги',
  'кукла',
  'курок',
  'лидер',
  'мазда',
  'марон',
  'навис',
  'нумик',
  'обкат',
  'обрез',
  'пайба',
  'пайса',
  'полив',
  'ризки',
  'семга',
  'сором',
  'сукре',
  'урали',
  'хлыст',
  'холка',
  'цинга',
  'эскиз',
  'банг',
  'биом',
  'бриг',
  'вояж',
  'вязь',
  'девы',
  'змий',
  'клоп',
  'кузу',
  'пайр',
  'прус',
  'сайт',
  'сект',
  'хиун',
  'швиц',
  'юмит',
  'гок',
  'гол',
  'изм',
  'кед',
  'мба',
  'мэр',
  'фен',
  'фиш',
  'эпи',
]

let lastRandom = 1n
const random = (n) => {
  const nextRandom = (333667n * lastRandom + 5393n) % 99990001n
  lastRandom = nextRandom
  return Number(nextRandom % BigInt(n))
}
const uuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = random(16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const getRandomItem = (arr) => arr[random(arr.length)]

function getRandomCreatedAt() {
  const start = new Date(2020, 0, 1)
  const end = new Date()
  return Math.round(
    start.getTime() +
      (random(10000) / 10000) * (end.getTime() - start.getTime()),
  )
}

const csvStream = async function* (fileName) {
  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    crlfDelay: Infinity,
  })

  const structure = new Map()
  let isFirstLine = true
  for await (const line of rl) {
    if (isFirstLine) {
      isFirstLine = false
      const keys = line.split(',').map((item) => item.trim())
      for (let index = 0; index < keys.length; index++) {
        structure[index] = keys[index]
      }
      continue
    }
    const values = line.split(',').map((item) => item.trim())
    const obj = {}
    for (let index = 0; index < values.length; index++) {
      obj[structure[index]] = values[index]
    }
    yield obj
  }
}

function createGovDataSetTitle() {
  const statesRussia = [
    'Амурской',
    'Архангельской',
    'Астраханской',
    'Белгородской',
    'Брянской',
    'Челябинской',
    'Иркутской',
    'Ивановской',
    'Калининградской',
    'Калужской',
    'Кемеровской',
    'Кировской',
    'Костромской',
    'Курганской',
    'Курской',
    'Ленинградской',
    'Липецкой',
    'Магаданской',
    'Московской',
    'Мурманской',
    'Нижегородской',
    'Новгородской',
    'Новосибирской',
    'Омской',
    'Оренбургской',
    'Орловской',
    'Пензенской',
    'Псковской',
    'Ростовской',
    'Рязанской',
    'Сахалинской',
    'Самарской',
    'Саратовской',
    'Смоленской',
    'Свердловской',
    'Тамбовской',
    'Томской',
    'Тверской',
    'Тульской',
    'Тюменской',
    'Ульяновской',
    'Владимирской',
    'Волгоградской',
    'Вологодской',
    'Воронежской',
    'Ярославской',
  ]

  const types = ['волонтерских', 'молодежных', 'детских', 'патриотических']

  switch (random(4)) {
    case 0:
      return `Реестр организаций и объединений ${getRandomItem(
        statesRussia,
      )} области`
    case 1:
      return `Реестр расположенных на территориях муниципальных образований ${getRandomItem(
        statesRussia,
      )} области`
    case 2:
      return `Реестр ${getRandomItem(
        types,
      )} общественных объединений ${getRandomItem(statesRussia)} области`
    case 3:
      return `Социально-ориентированные некоммерческие организации ${getRandomItem(
        statesRussia,
      )} области`
  }
}

async function init() {
  await executeStatement(`
    DROP SCHEMA IF EXISTS ${schemaNameAsId} CASCADE;
  `)
  await executeStatement(`
    CREATE SCHEMA ${schemaNameAsId};
  `)

  /* Categories */

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${categoriesTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY,
      ${escapeId('name')} TEXT NOT NULL
    );
  `)

  const categories = []
  for await (const { name } of csvStream('initial-data/categories.csv')) {
    const id = uuidV4()
    categories.push({ categoryId: id, name })
    await executeStatement(`
      INSERT INTO ${schemaNameAsId}.${categoriesTableNameAsId} (
        ${escapeId('id')},
        ${escapeId('name')}
      ) VALUES (
        ${escapeStr(id)},
        ${escapeStr(name)}
      );
    `)
  }

  /* Users */

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${usersTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY,
      ${escapeId('verified')} BOOL NULL,
      ${escapeId('createdAt')} BIGINT NOT NULL,
      ${escapeId('username')} TEXT NOT NULL,
      ${escapeId('hash')} TEXT NOT NULL,
      ${escapeId('salt')} TEXT NOT NULL
    );
  `)

  const businessUsers = []
  for await (const { name } of csvStream(
    'initial-data/companies-business.csv',
  )) {
    const id = uuidV4()
    const verified = true
    const createdAt = getRandomCreatedAt()
    const username = name
    const salt = id
    const hash = id
    businessUsers.push({ userId: id, username })
    await createUser({ id, verified, createdAt, username, salt, hash })
  }
  const govUsers = []
  for await (const { name } of csvStream('initial-data/companies-gov.csv')) {
    const id = uuidV4()
    const verified = true
    const createdAt = getRandomCreatedAt()
    const username = name
    const salt = id
    const hash = id
    govUsers.push({ userId: id, username })
    await createUser({ id, verified, createdAt, username, salt, hash })
  }

  /* Datasets */

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${datasetsTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY ,
      ${escapeId('userId')} UUID NOT NULL,
      ${escapeId('categoryId')} UUID NOT NULL,
      ${escapeId('title')} TEXT NOT NULL,
      ${escapeId('description')} TEXT NOT NULL,
      ${escapeId('format')} TEXT NOT NULL,
      ${escapeId('viewCount')} BIGINT NOT NULL,
      ${escapeId('downloadCount')} BIGINT NOT NULL,
      ${escapeId('releases')} JSONB NOT NULL,
      ${escapeId('structure')} JSONB NOT NULL,
      ${escapeId('subscriptionPrice')} BIGINT NULL,
      ${escapeId('oneTimeSalePrice')} BIGINT NULL
    );
  `)

  for (const { userId, username } of govUsers) {
    const datasetCount = 1 + random(4)
    for (let index = 0; index < datasetCount; index++) {
      const id = uuidV4()
      const categoryId = getRandomItem(categories).categoryId
      const title = createGovDataSetTitle()
      const description = title.replace('Реестр', 'Перечень')
      const format = getRandomItem(supportedFormats)
      const viewCount = random(1000)
      const downloadCount = random(100)
      const releases = []
      const releaseCount = random(10) + 1
      const structure = []
      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem([
            'id',
            'uid',
            '_id',
            'uuid',
            'primaryKey',
            'key',
            'guid',
          ]),
          description: 'Идентификатор',
          englishDescription: random(2) < 1 ? 'Identifier' : undefined,
          russianDescription: random(2) < 1 ? 'Идентификатор' : undefined,
          type: getRandomItem(['text', 'string']),
        })
      }
      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem(['name', 'title', 'header']),
          description: 'Имя',
          englishDescription: random(2) < 1 ? 'Name' : undefined,
          russianDescription: random(2) < 1 ? 'Имя' : undefined,
          type: getRandomItem(['text', 'string']),
        })
      }
      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem(['value', 'price', 'count']),
          description: 'Значение',
          englishDescription: random(2) < 1 ? 'Value' : undefined,
          russianDescription: random(2) < 1 ? 'Значение' : undefined,
          type: getRandomItem(['int', 'number']),
        })
      }

      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem([
            'active',
            'verified',
            'checked',
            'completed',
          ]),
          description: 'Статус',
          englishDescription: random(2) < 1 ? 'Status' : undefined,
          russianDescription: random(2) < 1 ? 'Статус' : undefined,
          type: getRandomItem(['boolean']),
        })
      }
      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem(['avg', 'average']),
          description: 'Среднее',
          englishDescription: random(2) < 1 ? 'Average' : undefined,
          russianDescription: random(2) < 1 ? 'Среднее' : undefined,
          type: getRandomItem(['int', 'number']),
        })
      }
      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem(['min', 'minimum']),
          description: 'Минимум',
          englishDescription: random(2) < 1 ? 'Minimum' : undefined,
          russianDescription: random(2) < 1 ? 'Минимум' : undefined,
          type: getRandomItem(['int', 'number']),
        })
      }
      if (random(2) < 1) {
        structure.push({
          fieldName: getRandomItem(['max', 'maximum']),
          description: 'Максимум',
          englishDescription: random(2) < 1 ? 'Maximum' : undefined,
          russianDescription: random(2) < 1 ? 'Максимум' : undefined,
          type: getRandomItem(['int', 'number']),
        })
      }
      for (let releaseIndex = 0; releaseIndex < releaseCount; releaseIndex++) {
        const release = {}
        for (const {
          fieldName,
          type,
        } of structure) {
          switch (type) {
            case 'int':
            case 'number': {
              release[fieldName] = random(1000000)
              break
            }
            case 'text':
            case 'string':  {
              release[fieldName] = getRandomItem(words)
              break
            }
            case 'boolean': {
              release[fieldName] = random(2)<1 ? true : false
              break
            }
            case 'date': {
              release[fieldName] = new Date(getRandomCreatedAt()).toISOString()
              break
            }
          }
        }
        if(random(2) < 1 ) {
          release.price = random(10000) + 100
        }
        releases.push(release)
      }
      const subscriptionPrice = (random(2) < 1) ? undefined : random(10000) + 100
      const oneTimeSalePrice = (random(2) < 1) ? undefined : random(20000) + 1000
    }
  }

  // releases: JSONB Array<{ releasedAt, releaseId, price }>

  // structure: {
  //   fieldName: text,
  //     description?: text
  //   englishDescription?: text,
  //     russianDescription?: text,
  //     format?: text
  // }
}
async function show() {
  console.log('Users:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId};
    `),
  )
  console.log('Categories:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId};
    `),
  )
  console.log('Datasets:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${datasetsTableNameAsId};
    `),
  )
}

async function createDataset() {
  ;`
  ${escapeId('id')},
  ${escapeId('userId')},
  ${escapeId('categoryId')},
  ${escapeId('title')},
  ${escapeId('description')},
  ${escapeId('format')},
  ${escapeId('viewCount')},
  ${escapeId('downloadCount')},
  ${escapeId('releases')},
  ${escapeId('structure')},
  ${escapeId('subscriptionPrice')},
  ${escapeId('oneTimeSalePrice')}
  `
}

async function createUser({
  id,
  createdAt,
  username,
  hash,
  salt,
  verified = false,
}) {
  await executeStatement(`
    INSERT INTO ${schemaNameAsId}.${usersTableNameAsId} (
      ${escapeId('id')},
      ${escapeId('verified')},
      ${escapeId('createdAt')},
      ${escapeId('username')},
      ${escapeId('hash')},
      ${escapeId('salt')}
    ) VALUES (
      ${escapeStr(id)},
      ${escapeStr(verified)},
      ${createdAt},
      ${escapeStr(username)},
      ${escapeStr(hash)},
      ${escapeStr(salt)}
    );
  `)
}

async function findUser(username) {
  const rows = await executeStatement(`
    SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId} 
    WHERE ${escapeId('username')} = ${escapeStr(username)}
    LIMIT 1;
  `)

  if (rows.length === 0) {
    return null
  }

  return {
    id: rows[0].id,
    createdAt: +rows[0].createdAt,
    username: rows[0].username,
    hash: rows[0].hash,
    salt: rows[0].salt,
  }
}

module.exports = {
  createUser,
  findUser,
  init,
  show,
  escapeStr,
  escapeId,
  executeStatement,
}
