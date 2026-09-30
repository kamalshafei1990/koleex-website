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
