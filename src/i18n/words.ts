/* ---------------------------------------------------------------------------
   i18n/words — the site's own words (menus, buttons, labels, messages) in
   Arabic and Chinese, keyed by their English. Any language without a word
   here shows the English (owner, 30/09/2026). Page content comes from the
   Hub (the Page Builder, product and category names) in its own languages.
   --------------------------------------------------------------------------- */

import { contentLang } from "@/i18n/config";

const WORDS: Record<string, { ar: string; zh: string }> = {
  /* Navigation */
  "Home": { ar: "الرئيسية", zh: "首页" },
  "Products": { ar: "المنتجات", zh: "产品" },
  "Solutions": { ar: "الحلول", zh: "解决方案" },
  "Stories": { ar: "القصص", zh: "资讯" },
  "About Us": { ar: "من نحن", zh: "关于我们" },
  "Careers": { ar: "الوظائف", zh: "招聘" },
  "Contact Us": { ar: "تواصل معنا", zh: "联系我们" },
  "Contact": { ar: "تواصل", zh: "联系" },
  "Search": { ar: "بحث", zh: "搜索" },
  "Menu": { ar: "القائمة", zh: "菜单" },
  "Close menu": { ar: "إغلاق القائمة", zh: "关闭菜单" },
  "Sign In": { ar: "تسجيل الدخول", zh: "登录" },
  "Region": { ar: "المنطقة", zh: "地区" },
  "Language": { ar: "اللغة", zh: "语言" },
  "Select language": { ar: "اختر اللغة", zh: "选择语言" },
  "Select region": { ar: "اختر المنطقة", zh: "选择地区" },
  "All Products": { ar: "كل المنتجات", zh: "全部产品" },
  "View all": { ar: "عرض الكل", zh: "查看全部" },

  /* Regions */
  "Global": { ar: "عالمي", zh: "全球" },
  "Middle East": { ar: "الشرق الأوسط", zh: "中东" },
  "Europe": { ar: "أوروبا", zh: "欧洲" },
  "Asia": { ar: "آسيا", zh: "亚洲" },
  "Americas": { ar: "الأمريكتان", zh: "美洲" },
  "Africa": { ar: "أفريقيا", zh: "非洲" },
  "Region suggestion": { ar: "اقتراح المنطقة", zh: "地区建议" },
  "You appear to be visiting from {country}. Would you like to switch to the {region} website?": {
    ar: "يبدو أنك تزور الموقع من {country}. هل تريد الانتقال إلى موقع {region}؟",
    zh: "您似乎正在从{country}访问。是否切换到{region}网站？",
  },
  "Switch to {region}": { ar: "الانتقال إلى {region}", zh: "切换到{region}" },
  "Stay on {region}": { ar: "البقاء على {region}", zh: "留在{region}" },
  "Dismiss": { ar: "إغلاق", zh: "关闭" },
  "Choose Your Country": { ar: "اختر بلدك", zh: "选择您的国家" },
  "or Region": { ar: "أو منطقتك", zh: "或地区" },

  /* Footer */
  "Company": { ar: "الشركة", zh: "公司" },
  "Resources": { ar: "مصادر", zh: "资源" },
  "Manufacturing": { ar: "التصنيع", zh: "制造" },
  "Energy Transition": { ar: "تحول الطاقة", zh: "能源转型" },
  "Infrastructure": { ar: "البنية التحتية", zh: "基础设施" },
  "Healthcare": { ar: "الرعاية الصحية", zh: "医疗健康" },
  "All Solutions": { ar: "كل الحلول", zh: "全部解决方案" },
  "CEO Message": { ar: "كلمة الرئيس التنفيذي", zh: "CEO 致辞" },
  "Sustainability": { ar: "الاستدامة", zh: "可持续发展" },
  "History": { ar: "تاريخنا", zh: "发展历程" },
  "Stories & Insights": { ar: "قصص ورؤى", zh: "资讯与洞察" },
  "Technology": { ar: "التكنولوجيا", zh: "技术" },
  "Global Presence": { ar: "حضورنا العالمي", zh: "全球布局" },

  /* Products */
  "Machinery and equipment across the Koleex divisions.": { ar: "ماكينات ومعدات عبر قطاعات Koleex.", zh: "Koleex 各事业部的机械与设备。" },
  "Our Divisions": { ar: "قطاعاتنا", zh: "我们的事业部" },
  "Explore by division": { ar: "تصفح حسب القطاع", zh: "按事业部浏览" },
  "Categories": { ar: "الفئات", zh: "类别" },
  "Types": { ar: "الأنواع", zh: "类型" },
  "1 product": { ar: "منتج واحد", zh: "1 款产品" },
  "{n} products": { ar: "{n} منتج", zh: "{n} 款产品" },
  "Find the right machine": { ar: "اعثر على الماكينة المناسبة", zh: "找到合适的机器" },
  "Our team can help you choose the right configuration for your production.": { ar: "فريقنا يساعدك في اختيار الإعداد المناسب لإنتاجك.", zh: "我们的团队可以帮助您为生产选择合适的配置。" },
  "Contact Sales": { ar: "تواصل مع المبيعات", zh: "联系销售" },
  "The product range will appear here shortly.": { ar: "ستظهر مجموعة المنتجات هنا قريبًا.", zh: "产品系列即将在此显示。" },
  "Products of this division will appear here shortly.": { ar: "ستظهر منتجات هذا القطاع هنا قريبًا.", zh: "该事业部的产品即将在此显示。" },
  "Products of this category will appear here shortly.": { ar: "ستظهر منتجات هذه الفئة هنا قريبًا.", zh: "该类别的产品即将在此显示。" },
  "Products of this type will appear here shortly.": { ar: "ستظهر منتجات هذا النوع هنا قريبًا.", zh: "该类型的产品即将在此显示。" },
  "Showing {n} of {total}": { ar: "عرض {n} من {total}", zh: "显示 {n} / {total}" },
  "Show {n} more": { ar: "عرض {n} أخرى", zh: "再显示 {n} 款" },
  "Loading…": { ar: "جارٍ التحميل…", zh: "加载中…" },
  "More products could not be loaded. Try again.": { ar: "تعذّر تحميل المزيد من المنتجات. حاول مرة أخرى.", zh: "无法加载更多产品，请重试。" },
  "Warranty": { ar: "الضمان", zh: "保修" },
  "Made in": { ar: "بلد الصنع", zh: "原产地" },
  "Certified": { ar: "معتمد", zh: "已认证" },
  "Compliant": { ar: "مطابق", zh: "符合" },
  "Protection": { ar: "درجة الحماية", zh: "防护等级" },
  "{n} months": { ar: "{n} شهرًا", zh: "{n} 个月" },
  "Request a quotation": { ar: "اطلب عرض سعر", zh: "索取报价" },
  "Models": { ar: "الموديلات", zh: "型号" },

  /* Search */
  "Search products by name or model": { ar: "ابحث عن منتج بالاسم أو الموديل", zh: "按名称或型号搜索产品" },
  "No product matches “{q}”.": { ar: "لا يوجد منتج يطابق «{q}».", zh: "没有与“{q}”匹配的产品。" },
  "Results for “{q}”": { ar: "نتائج «{q}»", zh: "“{q}”的搜索结果" },
  "See all {n} results": { ar: "عرض كل النتائج ({n})", zh: "查看全部 {n} 条结果" },
  "Type at least two letters.": { ar: "اكتب حرفين على الأقل.", zh: "请至少输入两个字符。" },
  "Close": { ar: "إغلاق", zh: "关闭" },

  /* Product details */
  "Specifications": { ar: "المواصفات", zh: "规格参数" },
  "Videos": { ar: "فيديوهات", zh: "视频" },
  "Manuals": { ar: "كتيبات التشغيل", zh: "使用手册" },
  "Manual": { ar: "كتيّب", zh: "手册" },
  "Download": { ar: "تحميل", zh: "下载" },
  "Yes": { ar: "نعم", zh: "是" },
  "No": { ar: "لا", zh: "否" },

  /* Catalogs */
  "Catalogs": { ar: "الكتالوجات", zh: "产品目录" },
  "Koleex catalogs to download.": { ar: "كتالوجات Koleex للتحميل.", zh: "可下载的 Koleex 产品目录。" },
  "Download PDF": { ar: "تحميل PDF", zh: "下载 PDF" },
  "Our catalogs will appear here shortly.": { ar: "ستظهر كتالوجاتنا هنا قريبًا.", zh: "我们的产品目录即将在此显示。" },

  /* Contact — the page and its form */
  "Get in Touch": { ar: "تواصل معنا", zh: "联系我们" },
  "Get in touch with Koleex International Group — sales, quotations and support.": { ar: "تواصل مع Koleex International Group — المبيعات وعروض الأسعار والدعم.", zh: "联系 Koleex International Group——销售、报价与支持。" },
  "Tell us what you produce and what you need — our team will help you choose the right machines.": { ar: "أخبرنا بما تنتجه وما تحتاجه — وسيساعدك فريقنا في اختيار الماكينات المناسبة.", zh: "告诉我们您生产什么、需要什么——我们的团队将帮助您选择合适的机器。" },
  "Write or call us": { ar: "راسلنا أو اتصل بنا", zh: "写信或致电我们" },
  "A quotation, a question about a machine, or a partnership — we answer in English, Arabic and Chinese.": { ar: "عرض سعر، أو سؤال عن ماكينة، أو شراكة — نرد بالإنجليزية والعربية والصينية.", zh: "询价、机器咨询或合作——我们使用英文、阿拉伯文和中文回复。" },
  "Email": { ar: "البريد الإلكتروني", zh: "电子邮件" },
  "Phone": { ar: "الهاتف", zh: "电话" },
  "Main base": { ar: "المقر الرئيسي", zh: "总部" },
  "Where we work": { ar: "أين نعمل", zh: "业务所在地" },
  "Our contact details will appear here shortly.": { ar: "ستظهر بيانات التواصل هنا قريبًا.", zh: "我们的联系方式即将在此显示。" },
  "Send us a message": { ar: "أرسل لنا رسالة", zh: "给我们留言" },
  "Your name": { ar: "اسمك", zh: "您的姓名" },
  "Optional": { ar: "اختياري", zh: "选填" },
  "Country": { ar: "البلد", zh: "国家/地区" },
  "Choose your country": { ar: "اختر بلدك", zh: "选择您的国家/地区" },
  "Message": { ar: "الرسالة", zh: "留言内容" },
  "I would like a quotation for {product}.": { ar: "أرغب في الحصول على عرض سعر لـ {product}.", zh: "我想获取 {product} 的报价。" },
  "Send message": { ar: "إرسال الرسالة", zh: "发送留言" },
  "Sending…": { ar: "جارٍ الإرسال…", zh: "发送中…" },
  "We use your details only to answer your message.": { ar: "نستخدم بياناتك فقط للرد على رسالتك.", zh: "我们仅使用您的信息来回复您的留言。" },
  "Thank you — your message has reached us.": { ar: "شكرًا لك — وصلتنا رسالتك.", zh: "谢谢——我们已收到您的留言。" },
  "Our team will answer you by email.": { ar: "سيرد عليك فريقنا عبر البريد الإلكتروني.", zh: "我们的团队将通过电子邮件回复您。" },
  "Our team will send you the quotation by email.": { ar: "سيرسل لك فريقنا عرض السعر عبر البريد الإلكتروني.", zh: "我们的团队将通过电子邮件向您发送报价。" },
  "Send another message": { ar: "إرسال رسالة أخرى", zh: "再发一条留言" },
  "Write your name.": { ar: "اكتب اسمك.", zh: "请填写您的姓名。" },
  "Write a valid email address.": { ar: "اكتب بريدًا إلكترونيًا صحيحًا.", zh: "请填写有效的电子邮件地址。" },
  "Write the phone number with digits only.": { ar: "اكتب رقم الهاتف بالأرقام فقط.", zh: "电话号码只能包含数字。" },
  "Write your message.": { ar: "اكتب رسالتك.", zh: "请填写留言内容。" },
  "Please check your message and send it again.": { ar: "راجع رسالتك وأرسلها مرة أخرى من فضلك.", zh: "请检查您的留言后再次发送。" },
  "The message is too long.": { ar: "الرسالة طويلة جدًا.", zh: "留言内容过长。" },
  "You have sent several messages in a short time. Please try again in an hour.": { ar: "أرسلت عدة رسائل في وقت قصير. حاول مرة أخرى بعد ساعة من فضلك.", zh: "您在短时间内发送了多条留言，请一小时后再试。" },
  "Your message could not be sent. Please try again, or email us at {email}.": { ar: "تعذّر إرسال رسالتك. حاول مرة أخرى، أو راسلنا على {email}.", zh: "您的留言未能发送。请重试，或发送邮件至 {email}。" },
  "Your message could not be sent. Please try again.": { ar: "تعذّر إرسال رسالتك. حاول مرة أخرى.", zh: "您的留言未能发送，请重试。" },
  "Apply for this position": { ar: "التقدّم لهذه الوظيفة", zh: "申请该职位" },
  "Email us your CV — the subject is already written for you.": { ar: "أرسل لنا سيرتك الذاتية بالبريد الإلكتروني — عنوان الرسالة مكتوب لك مسبقًا.", zh: "请通过电子邮件发送您的简历——邮件主题已为您填好。" },
  "Email us": { ar: "راسلنا", zh: "发送邮件" },

  /* Careers */
  "Open positions": { ar: "الوظائف المتاحة", zh: "开放职位" },
  "Apply": { ar: "تقدّم", zh: "申请" },
  "There are no open positions right now.": { ar: "لا توجد وظائف متاحة حاليًا.", zh: "目前没有开放职位。" },

  /* Pages */
  "This page could not be found.": { ar: "هذه الصفحة غير موجودة.", zh: "找不到此页面。" },
  "Go to the home page": { ar: "الذهاب إلى الصفحة الرئيسية", zh: "返回首页" },
  "This page is shown in English until its translation is ready.": { ar: "هذه الصفحة معروضة بالإنجليزية لحين جاهزية ترجمتها.", zh: "此页面的翻译完成之前以英文显示。" },
  "Draft preview — visitors do not see these changes until the page is published.": { ar: "معاينة المسودة — الزوار لا يرون هذه التعديلات حتى تُنشر الصفحة.", zh: "草稿预览——页面发布前访客看不到这些更改。" },
  "Exit preview": { ar: "الخروج من المعاينة", zh: "退出预览" },
};

/** A word of the site in a language (English when not translated). {name}
 *  placeholders are filled from `vars`. */
export function translate(text: string, lang: string, vars?: Record<string, string | number>): string {
  const c = contentLang(lang);
  let out = c === "en" ? text : WORDS[text]?.[c] ?? text;
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
  return out;
}

/** "1 product" / "{n} products" in a language. */
export const productCount = (n: number, lang: string): string => (n === 1 ? translate("1 product", lang) : translate("{n} products", lang, { n }));
