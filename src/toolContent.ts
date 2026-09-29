export type Lang = 'en' | 'zh';

export interface Step { t: string; d: string }
export interface Feature { t: string; d: string; img?: string }
export interface QA { q: string; a: string }
export interface Related { name: string; d: string; href: string }

export interface ToolContentData {
  howto: { title: string; sub: string; steps: Step[] };
  features: Feature[];
  benefits: { title: string; sub: string; items: Step[] };
  related: { title: string; sub: string; items: Related[] };
  faq: QA[];
}

const relatedLink = (zh: boolean, href: string) => (zh ? `/zh${href}` : href);

export const toolContent: Record<string, Record<Lang, ToolContentData>> = {
  'blur-image': {
    zh: {
      howto: { title: '如何在线模糊图片', sub: '三个简单步骤隐藏敏感内容', steps: [
        { t: '上传图片', d: '点击选择或拖拽上传图片，图片直接在浏览器中打开。' },
        { t: '选择效果与强度', d: '拖动强度滑块，在高斯模糊、像素化、噪点和遮盖之间切换，实时预览。' },
        { t: '下载结果', d: '对效果满意后，下载处理完成的图片，原图仍留在你的设备上。' },
      ] },
      features: [
        { t: '多种模糊效果', d: '高斯模糊生成平滑自然的虚化，像素化把细节变成块状，噪点打散可读内容，遮盖整块覆盖必须隐藏的区域。', img: '/img/tools/compress_feature1.webp' },
        { t: '100% 本地处理', d: '所有编辑通过浏览器 Canvas 在你的设备上完成，图片不会上传到任何服务器，数据完全私密。', img: '/img/tools/compress_feature2.webp' },
        { t: '实时预览', d: '每次调整强度或切换效果都即时反映在预览里，无需猜测结果。', img: '/img/tools/compress_feature3.webp' },
        { t: '支持主流格式', d: '支持 JPG、PNG 和 WebP，导出格式与质量可自由选择，兼顾清晰度和文件大小。', img: '/img/tools/compress_feature4.webp' },
      ],
      benefits: { title: '为什么分享前要模糊图片？', sub: '一张没处理的截图就可能泄露隐私', items: [
        { t: '保护人脸隐私', d: '发布合影、活动照或街拍前隐藏不应公开的人脸，同时保留画面语境。' },
        { t: '隐藏敏感文字', d: '遮挡姓名、邮箱、订单号、账号和地址，避免截图外泄个人信息。' },
        { t: '遮盖车牌号码', d: '发布汽车照片、二手车图片或旅行照片前隐藏车牌。' },
        { t: '避免位置泄露', d: '模糊房间背景、屏幕内容和证件票据，减少可被追踪的线索。' },
      ] },
      related: { title: '继续处理你的图片', sub: '模糊只是分享前准备的一步', items: [
        { name: '隐私处理', d: '给截图、表单和证件图片做系统性隐私检查。', href: relatedLink(true, '/privacy-blur') },
        { name: '图片压缩', d: '模糊后再压缩，上传和分享更快。', href: relatedLink(true, '/compress-image') },
        { name: '调整图片尺寸', d: '按发布平台要求设置精确宽高。', href: relatedLink(true, '/resize-image') },
      ] },
      faq: [
        { q: '模糊图片是免费的吗？', a: '单张图片的模糊和处理完全免费，无需注册账号。' },
        { q: '我的图片会被上传吗？', a: '不会。所有模糊处理都在你的浏览器内完成，图片不会离开你的设备。' },
        { q: '高斯模糊和像素化应该选哪个？', a: '想让区域看起来自然选高斯模糊；想让人完全无法还原内容（如人脸、车牌、文字）选像素化。' },
        { q: '支持手机使用吗？', a: '支持。页面适配现代手机浏览器，涂抹和选区都支持触摸操作。' },
      ],
    },
    en: {
      howto: { title: 'How to blur an image online', sub: 'Hide sensitive details in three simple steps', steps: [
        { t: 'Upload an image', d: 'Click or drag to upload — the image opens directly in your browser.' },
        { t: 'Pick the effect and strength', d: 'Drag the strength slider and switch between Gaussian blur, pixelation, noise and cover with a live preview.' },
        { t: 'Download the result', d: 'Download the finished image once you are happy — the original stays on your device.' },
      ] },
      features: [
        { t: 'Multiple blur effects', d: 'Gaussian for smooth natural softness, pixelation for unreadable blocks, noise to scramble readable text, and solid cover for anything that must disappear.', img: '/img/tools/compress_feature1.webp' },
        { t: '100% local processing', d: 'Every edit runs on Canvas in your browser. Images never leave your device, so your data stays fully private.', img: '/img/tools/compress_feature2.webp' },
        { t: 'Live preview', d: 'Every strength change and effect switch is reflected instantly — no guessing the result.', img: '/img/tools/compress_feature3.webp' },
        { t: 'Modern formats', d: 'JPG, PNG and WebP are supported, with a free choice of export format and quality.', img: '/img/tools/compress_feature4.webp' },
      ],
      benefits: { title: 'Why blur images before sharing?', sub: 'One unprocessed screenshot can leak a lot', items: [
        { t: 'Protect faces', d: 'Hide faces that should not be public in group, event or street photos while keeping the context.' },
        { t: 'Hide sensitive text', d: 'Cover names, emails, order numbers, accounts and addresses before a screenshot leaves your machine.' },
        { t: 'Cover license plates', d: 'Blur plates before posting car, used-car listing or travel photos.' },
        { t: 'Avoid location leaks', d: 'Blur room backgrounds, screens and IDs to remove traceable clues.' },
      ] },
      related: { title: 'Continue working on your image', sub: 'Blurring is one step of the pre-sharing routine', items: [
        { name: 'Privacy blur', d: 'Run a systematic privacy pass on screenshots, forms and IDs.', href: relatedLink(false, '/privacy-blur') },
        { name: 'Compress image', d: 'Compress after blurring for faster uploads and sharing.', href: relatedLink(false, '/compress-image') },
        { name: 'Resize image', d: 'Set exact width and height for the platform you post to.', href: relatedLink(false, '/resize-image') },
      ] },
      faq: [
        { q: 'Is blurring images free?', a: 'Yes. Blurring and editing single images is completely free, no account required.' },
        { q: 'Are my images uploaded?', a: 'No. All blurring happens inside your browser — images never leave your device.' },
        { q: 'Gaussian blur or pixelation?', a: 'Pick Gaussian for a natural look; pick pixelation when the content must be impossible to recover, such as faces, plates or text.' },
        { q: 'Does it work on mobile?', a: 'Yes. Pages support modern mobile browsers and touch input for brushing and selection.' },
      ],
    },
  },
  'compress-image': {
    zh: {
      howto: { title: '如何在线压缩图片', sub: '三个简单步骤优化您的图片', steps: [
        { t: '上传图片', d: '选择图片或拖拽上传，将图片加载到压缩工具中。' },
        { t: '调整设置', d: '选择您想要的导出格式和质量。' },
        { t: '下载', d: '立即下载优化后的图片。' },
      ] },
      features: [
        { t: '智能压缩技术', d: '我们的先进算法分析您的图片以确定最佳压缩比。在保持专业结果所需的视觉质量的同时，将文件大小显著降低。', img: '/img/tools/compress_feature1.webp' },
        { t: '100% 安全的客户端处理', d: '您的隐私是我们的首要任务。与其他工具不同，我们直接在您的浏览器中处理您的图片。没有文件上传到我们的服务器，确保您的数据完全私密。', img: '/img/tools/compress_feature2.webp' },
        { t: '即时预览与控制', d: '无需猜测结果。实时查看压缩后的图片和文件大小。调整质量设置和格式，找到满足您需求的完美平衡。', img: '/img/tools/compress_feature3.webp' },
        { t: '支持现代格式', d: '自动将您的图片转换为高效的 WebP 格式，或选择保留为 JPEG 或 PNG。我们支持所有主要格式，以确保跨平台兼容性。', img: '/img/tools/compress_feature4.webp' },
      ],
      benefits: { title: '为什么压缩您的图片？', sub: '优化的图片是更好的网络体验的关键', items: [
        { t: '更快的网站加载速度', d: '大图片会拖慢您的网站。压缩可以显著提高加载时间，提升 SEO 并保持访问者的参与度。' },
        { t: '节省存储空间', d: '在不牺牲质量的情况下缩小图片文件大小，从而降低存储成本并释放设备空间。' },
        { t: '更好的用户体验', d: '用户期望快速、响应迅速的网站。压缩图片确保在所有设备（尤其是移动设备）上流畅滚动和快速显示。' },
        { t: '更容易分享', d: '通过电子邮件或消息应用程序更快地发送照片。较小的文件上传速度快，并且不会触及附件大小限制。' },
      ] },
      related: { title: '继续处理你的图片', sub: '压缩是发布前准备的一环', items: [
        { name: '调整图片尺寸', d: '压缩后再按网站、表单或社交平台要求设置精确宽高。', href: relatedLink(true, '/resize-image') },
        { name: '图片模糊', d: '上传前先模糊人脸、文字、截图或私密细节。', href: relatedLink(true, '/blur-image') },
        { name: '视频帧提取器', d: '先从视频提取画面，再压缩保存的图片用于分享。', href: relatedLink(true, '/media/video-frame-extractor') },
      ] },
      faq: [
        { q: '它是免费的吗？', a: '是。单张图片压缩免费使用，无需注册账号。' },
        { q: '我的数据安全吗？', a: '安全。压缩在你的浏览器内完成，图片不会被上传到任何服务器。' },
        { q: '支持哪些格式？', a: '支持 JPG、PNG 和 WebP 输入与导出，可按需求选择体积最优的格式。' },
        { q: '会降低质量吗？', a: '压缩总会去掉一些数据，但你可以用质量滑块在体积和清晰度之间实时找到平衡点，预览满意后再下载。' },
      ],
    },
    en: {
      howto: { title: 'How to compress images online', sub: 'Optimize your images in three simple steps', steps: [
        { t: 'Upload an image', d: 'Select or drag and drop an image to load it into the compressor.' },
        { t: 'Adjust settings', d: 'Choose your preferred export format and quality.' },
        { t: 'Download', d: 'Download the optimized image right away.' },
      ] },
      features: [
        { t: 'Smart compression', d: 'Our algorithm analyzes your image to find the best compression ratio, cutting file size significantly while keeping the visual quality professional work needs.', img: '/img/tools/compress_feature1.webp' },
        { t: '100% secure client-side processing', d: 'Your privacy comes first. Unlike other tools we process images right in your browser — no files are uploaded to any server, keeping your data fully private.', img: '/img/tools/compress_feature2.webp' },
        { t: 'Instant preview and control', d: 'No guessing. See the compressed image and its file size in real time, then tune quality and format until you hit the perfect balance.', img: '/img/tools/compress_feature3.webp' },
        { t: 'Modern formats', d: 'Convert your image to efficient WebP automatically, or keep JPEG or PNG. All major formats are supported for cross-platform compatibility.', img: '/img/tools/compress_feature4.webp' },
      ],
      benefits: { title: 'Why compress your images?', sub: 'Optimized images are the key to a better web experience', items: [
        { t: 'Faster website loading', d: 'Large images slow your site down. Compression markedly improves load times, boosts SEO and keeps visitors engaged.' },
        { t: 'Save storage space', d: 'Shrink image files without sacrificing quality to cut storage costs and free up device space.' },
        { t: 'Better user experience', d: 'Users expect fast, responsive sites. Compressed images ensure smooth scrolling and quick display on every device, especially mobile.' },
        { t: 'Easier sharing', d: 'Send photos faster over email or messaging apps. Smaller files upload quickly and never hit attachment limits.' },
      ] },
      related: { title: 'Continue working on your image', sub: 'Compression is one step of the pre-publish routine', items: [
        { name: 'Resize image', d: 'After compressing, set exact dimensions for websites, forms or social posts.', href: relatedLink(false, '/resize-image') },
        { name: 'Blur image', d: 'Blur faces, text, screenshots or private details before uploading.', href: relatedLink(false, '/blur-image') },
        { name: 'Video frame extractor', d: 'Pull a frame from video first, then compress the saved still before sharing.', href: relatedLink(false, '/media/video-frame-extractor') },
      ] },
      faq: [
        { q: 'Is it free?', a: 'Yes. Compressing single images is free, no account required.' },
        { q: 'Is my data safe?', a: 'Yes. Compression runs in your browser — images are never uploaded to a server.' },
        { q: 'Which formats are supported?', a: 'JPG, PNG and WebP for both input and export, so you can always pick the most size-efficient format.' },
        { q: 'Will quality drop?', a: 'Compression always discards some data, but the quality slider lets you balance size and clarity with a live preview before you download.' },
      ],
    },
  },
  'resize-image': {
    zh: {
      howto: { title: '如何在线调整图片尺寸', sub: '三步得到精确图片宽高', steps: [
        { t: '上传图片', d: '选择单张图片，或一次上传一批图片。' },
        { t: '设置尺寸', d: '输入宽度和高度，可保持比例，也可以为某张图片单独修改。' },
        { t: '生成并下载', d: '在浏览器中生成新尺寸图片，然后下载。' },
      ] },
      features: [
        { t: '批量调整尺寸', d: '一次上传多张图片，并把相同宽度或高度应用到整批图片。', img: '/img/tools/resize.webp' },
        { t: '单张独立控制', d: '在列表中打开任意图片，单独设置宽高、格式和质量。' },
        { t: '浏览器本地处理', d: '普通尺寸调整在浏览器中完成，图片无需上传到服务器。' },
        { t: '支持 JPG、PNG、WebP 输出', d: '根据小体积、透明背景或现代网页需求选择合适输出格式。' },
      ],
      benefits: { title: '根据实际发布需求调整图片尺寸', sub: '为头像、上传表单、商品列表、文章或邮件准备合适尺寸', items: [
        { t: '头像和社交图片', d: '发布前缩小照片、裁掉多余区域，或制作方形头像。' },
        { t: '商品和电商图片', d: '为商品列表、目录和店铺页面准备统一尺寸的产品图。' },
        { t: '表单、证件和截图', d: '调整截图或文档图片以符合上传限制，同时保持内容清晰可读。' },
        { t: '先裁剪再调整尺寸', d: '先选择需要保留的区域，再按所需的精确宽高导出。' },
      ] },
      related: { title: '继续处理你的图片', sub: '尺寸调好还能再加工', items: [
        { name: '图片压缩', d: '高效在线压缩图片，减小文件大小。', href: relatedLink(true, '/compress-image') },
        { name: '图片模糊', d: '轻松模糊图片部分区域或背景。', href: relatedLink(true, '/blur-image') },
        { name: '裁剪与旋转', d: '先选区域再导出，配合尺寸调整更精确。', href: relatedLink(true, '/crop-rotate-image') },
      ] },
      faq: [
        { q: '这个图片尺寸工具免费吗？', a: '免费。单张和批量调整尺寸都可免费使用，无需注册。' },
        { q: '图片会被上传吗？', a: '不会。普通尺寸调整全部在浏览器本地完成。' },
        { q: '可以同时裁剪和调整尺寸吗？', a: '可以。先在编辑器中选择保留区域，再按目标宽高导出。' },
        { q: '应该选择哪种输出格式？', a: '网页和表单推荐 WebP 或 JPG，需要透明背景选 PNG。' },
      ],
    },
    en: {
      howto: { title: 'How to resize images online', sub: 'Exact width and height in three steps', steps: [
        { t: 'Upload images', d: 'Pick a single image or upload a whole batch at once.' },
        { t: 'Set the size', d: 'Enter width and height, keep the aspect ratio, or edit a single image individually.' },
        { t: 'Generate and download', d: 'Generate the resized image in your browser, then download it.' },
      ] },
      features: [
        { t: 'Batch resizing', d: 'Upload multiple images at once and apply the same width or height to the whole batch.', img: '/img/tools/resize.webp' },
        { t: 'Individual control', d: 'Open any image in the list and set its width, height, format and quality separately.' },
        { t: 'Local browser processing', d: 'Everyday resizing runs in your browser — no upload to any server.' },
        { t: 'JPG, PNG and WebP output', d: 'Choose the right output format for small size, transparency or modern web needs.' },
      ],
      benefits: { title: 'Resize images for real publishing needs', sub: 'Prepare sizes for avatars, upload forms, product listings, articles or emails', items: [
        { t: 'Avatars and social images', d: 'Shrink photos, crop away excess, or make square avatars before posting.' },
        { t: 'Products and e-commerce', d: 'Prepare uniformly sized product images for listings, catalogs and shop pages.' },
        { t: 'Forms, IDs and screenshots', d: 'Fit screenshots or document images to upload limits while keeping them readable.' },
        { t: 'Crop first, then resize', d: 'Select the area to keep first, then export at the exact width and height you need.' },
      ] },
      related: { title: 'Continue working on your image', sub: 'Once resized, keep polishing', items: [
        { name: 'Compress image', d: 'Efficiently shrink file sizes online.', href: relatedLink(false, '/compress-image') },
        { name: 'Blur image', d: 'Easily blur parts of an image or its background.', href: relatedLink(false, '/blur-image') },
        { name: 'Crop & rotate', d: 'Select the area first, then export — pairs perfectly with resizing.', href: relatedLink(false, '/crop-rotate-image') },
      ] },
      faq: [
        { q: 'Is this resize tool free?', a: 'Yes. Both single and batch resizing are free, no sign-up needed.' },
        { q: 'Are images uploaded?', a: 'No. Everyday resizing completes entirely in your browser.' },
        { q: 'Can I crop and resize at once?', a: 'Yes. Select the area to keep in the editor first, then export at the target size.' },
        { q: 'Which output format should I pick?', a: 'WebP or JPG for web and forms; PNG when you need transparency.' },
      ],
    },
  },
  'crop-rotate-image': {
    zh: {
      howto: { title: '如何在线裁剪和旋转图片', sub: '三步整理好图片构图', steps: [
        { t: '上传图片', d: '选择或拖拽上传需要整理的图片。' },
        { t: '裁剪、旋转与翻转', d: '框选保留区域，按需旋转 90° 或水平垂直翻转。' },
        { t: '导出下载', d: '确认构图后导出，下载整理完成的图片。' },
      ] },
      features: [
        { t: '自由裁剪', d: '拖动选区精确控制保留范围，去掉多余边角和干扰内容。' },
        { t: '旋转与翻转', d: '一键旋转 90°，或水平、垂直翻转，快速纠正拍摄方向。' },
        { t: '浏览器本地处理', d: '裁剪和旋转在浏览器内完成，图片不上传服务器。' },
        { t: '精确输出', d: '按目标比例裁剪，配合尺寸工具得到符合要求的成图。' },
      ],
      benefits: { title: '为什么发布前要裁剪图片？', sub: '好的构图让主体更突出', items: [
        { t: '聚焦主体', d: '裁掉杂乱背景，让人物、商品或主体成为画面中心。' },
        { t: '符合上传比例', d: '按平台要求的 1:1、4:3、16:9 等比例裁剪，避免被强制裁切。' },
        { t: '去掉干扰内容', d: '把边缘的路人、屏幕或敏感物件裁出画面。' },
        { t: '纠正方向', d: '修正横竖颠倒的照片，省得一张张重拍。' },
      ] },
      related: { title: '继续处理你的图片', sub: '裁剪后还能继续加工', items: [
        { name: '调整图片尺寸', d: '裁剪后按精确宽高导出。', href: relatedLink(true, '/resize-image') },
        { name: '图片模糊', d: '对保留区域里的敏感细节做模糊处理。', href: relatedLink(true, '/blur-image') },
        { name: '图片压缩', d: '导出前压缩，文件更小上传更快。', href: relatedLink(true, '/compress-image') },
      ] },
      faq: [
        { q: '裁剪图片是免费的吗？', a: '免费。单张图片的裁剪、旋转和翻转都无需注册即可使用。' },
        { q: '裁剪会损失画质吗？', a: '裁剪只去掉选区外的像素，保留部分保持原始分辨率，不会额外压缩。' },
        { q: '支持哪些格式？', a: '支持 JPG、PNG 和 WebP 的导入与导出。' },
        { q: '可以撤销操作吗？', a: '可以。编辑器支持撤销和重做，也可以随时重新开始。' },
      ],
    },
    en: {
      howto: { title: 'How to crop and rotate images online', sub: 'Fix your composition in three steps', steps: [
        { t: 'Upload an image', d: 'Select or drag in the image you want to tidy up.' },
        { t: 'Crop, rotate and flip', d: 'Box-select the area to keep, rotate 90° or flip horizontally and vertically as needed.' },
        { t: 'Export and download', d: 'Export once the composition looks right and download the result.' },
      ] },
      features: [
        { t: 'Free cropping', d: 'Drag the selection to control exactly what stays — trim edges and distractions.' },
        { t: 'Rotate and flip', d: 'Rotate 90° or flip horizontally and vertically in one click to fix orientation.' },
        { t: 'Local browser processing', d: 'Cropping and rotating run in your browser; images are never uploaded.' },
        { t: 'Precise output', d: 'Crop to a target ratio and pair it with the resize tool for exact dimensions.' },
      ],
      benefits: { title: 'Why crop images before posting?', sub: 'Good composition puts the subject first', items: [
        { t: 'Focus on the subject', d: 'Trim busy backgrounds so people, products or subjects take center stage.' },
        { t: 'Match upload ratios', d: 'Crop to 1:1, 4:3 or 16:9 as platforms require and avoid forced cropping.' },
        { t: 'Remove distractions', d: 'Cut bystanders, screens or sensitive objects out of the frame.' },
        { t: 'Fix orientation', d: 'Correct sideways or upside-down shots without reshooting.' },
      ] },
      related: { title: 'Continue working on your image', sub: 'Keep refining after cropping', items: [
        { name: 'Resize image', d: 'Export at exact dimensions after cropping.', href: relatedLink(false, '/resize-image') },
        { name: 'Blur image', d: 'Blur sensitive details inside the area you kept.', href: relatedLink(false, '/blur-image') },
        { name: 'Compress image', d: 'Compress before export for smaller, faster uploads.', href: relatedLink(false, '/compress-image') },
      ] },
      faq: [
        { q: 'Is cropping free?', a: 'Yes. Cropping, rotating and flipping single images need no account.' },
        { q: 'Does cropping lose quality?', a: 'No. Cropping only removes pixels outside the selection — what stays keeps its original resolution.' },
        { q: 'Which formats are supported?', a: 'JPG, PNG and WebP for both import and export.' },
        { q: 'Can I undo operations?', a: 'Yes. The editor supports undo and redo, and you can always start over.' },
      ],
    },
  },
  'privacy-blur': {
    zh: {
      howto: { title: '如何给图片做隐私处理', sub: '发布前系统检查并隐藏敏感内容', steps: [
        { t: '上传图片', d: '上传截图、文档、表单或生活照片。' },
        { t: '检查并处理敏感区域', d: '用涂抹、矩形或套索选中人脸、姓名、证件、车牌等信息，选高斯模糊或像素化隐藏。' },
        { t: '预览并下载', d: '逐项确认没有遗漏后，下载处理完成的图片。' },
      ] },
      features: [
        { t: '多种选区方式', d: '涂抹适合不规则区域，矩形适合成块文字，套索勾勒任意形状。' },
        { t: '高强度隐藏效果', d: '高斯模糊与像素化让敏感内容不可辨认、无法还原。' },
        { t: '全程本地处理', d: '截图、证件和表单包含最敏感的信息，本地处理确保它们不离开设备。' },
        { t: '导出前预览', d: '放大检查每个处理区域，确认没有遗漏再下载。' },
      ],
      benefits: { title: '哪些图片发布前需要隐私处理？', sub: '宁可多查一遍，不要事后补救', items: [
        { t: '聊天和后台截图', d: '隐藏姓名、头像、账号、订单号和内部系统信息。' },
        { t: '证件和票据', d: '遮盖身份证、护照、发票和快递单上的关键信息。' },
        { t: '家庭和生活照片', d: '模糊人脸、门牌、车牌和窗外街景。' },
        { t: '工作文档截图', d: '处理客户资料、数据面板和邮件内容后再分享。' },
      ] },
      related: { title: '继续处理你的图片', sub: '隐私处理只是第一步', items: [
        { name: '图片模糊', d: '对单个人脸、文字或区域做精细模糊。', href: relatedLink(true, '/blur-image') },
        { name: '图片压缩', d: '处理完成后压缩图片，方便上传和发送。', href: relatedLink(true, '/compress-image') },
        { name: '调整图片尺寸', d: '按表单或平台要求输出精确尺寸。', href: relatedLink(true, '/resize-image') },
      ] },
      faq: [
        { q: '处理后的图片还能还原吗？', a: '像素化会彻底破坏原始信息，高强度高斯模糊同样不可逆。请避免只用很低的模糊强度处理敏感内容。' },
        { q: '和普通模糊工具有什么区别？', a: '隐私处理强调系统性：选区方式更多、效果更强，适合截图、证件这类一次要处理多处敏感信息的图片。' },
        { q: '图片会上传吗？', a: '不会。隐私处理全程在浏览器本地完成，截图和证件不会离开你的设备。' },
        { q: '支持批量处理吗？', a: '当前版本以单张精修为主，批量能力在规划中。' },
      ],
    },
    en: {
      howto: { title: 'How to redact an image for privacy', sub: 'Check and hide sensitive content before you post', steps: [
        { t: 'Upload an image', d: 'Upload a screenshot, document, form or everyday photo.' },
        { t: 'Review and redact', d: 'Use brush, rectangle or lasso to select faces, names, IDs and plates, then hide them with Gaussian blur or pixelation.' },
        { t: 'Preview and download', d: 'Double-check every area, then download the finished image.' },
      ] },
      features: [
        { t: 'Multiple selection tools', d: 'Brush for irregular shapes, rectangle for blocks of text, lasso for any outline.' },
        { t: 'Strong redaction effects', d: 'Gaussian blur and pixelation make sensitive content unreadable and unrecoverable.' },
        { t: 'Local all the way', d: 'Screenshots, IDs and forms carry the most sensitive data — local processing guarantees they never leave your device.' },
        { t: 'Preview before export', d: 'Zoom in on each redacted area and confirm nothing was missed before downloading.' },
      ],
      benefits: { title: 'Which images need a privacy pass?', sub: 'Better one check too many than a leak', items: [
        { t: 'Chat and admin screenshots', d: 'Hide names, avatars, accounts, order numbers and internal system details.' },
        { t: 'IDs and receipts', d: 'Cover key fields on IDs, passports, invoices and shipping labels.' },
        { t: 'Family and lifestyle photos', d: 'Blur faces, house numbers, plates and street views through windows.' },
        { t: 'Work document shots', d: 'Redact client data, dashboards and email content before sharing.' },
      ] },
      related: { title: 'Continue working on your image', sub: 'Redaction is step one', items: [
        { name: 'Blur image', d: 'Fine-grained blurring for single faces, text or areas.', href: relatedLink(false, '/blur-image') },
        { name: 'Compress image', d: 'Compress after redaction for easy uploads.', href: relatedLink(false, '/compress-image') },
        { name: 'Resize image', d: 'Export exact dimensions for forms and platforms.', href: relatedLink(false, '/resize-image') },
      ] },
      faq: [
        { q: 'Can redacted images be recovered?', a: 'Pixelation destroys the original data outright, and strong Gaussian blur is equally irreversible. Avoid very low blur strength on sensitive content.' },
        { q: 'How is this different from a regular blur tool?', a: 'Privacy blur is systematic: more selection methods, stronger effects — built for screenshots and IDs where many spots must be hidden at once.' },
        { q: 'Are images uploaded?', a: 'No. Redaction runs entirely in your browser — screenshots and IDs never leave your device.' },
        { q: 'Is batch processing supported?', a: 'The current version focuses on single-image precision; batch capability is planned.' },
      ],
    },
  },
  'blur-face': {
    zh: {
      howto: { title: '如何在线模糊人脸', sub: '三个步骤隐藏照片中的人物身份', steps: [
        { t: '上传照片', d: '点击选择或拖拽上传照片，直接在浏览器中打开，不需要注册账号。' },
        { t: '选中人脸区域', d: '用涂抹、矩形或套索三种方式之一圈出人脸，画笔大小可随时调整，密集人群也能逐个覆盖。' },
        { t: '选择效果并导出', d: '在高斯模糊、像素化、噪点和完全遮盖之间切换，预览满意后下载成图。' },
      ] },
      features: [
        { t: '三种选区方式', d: '涂抹适合快速划过，矩形适合成片人群，套索贴合不规则的脸部轮廓。' },
        { t: '四种遮盖效果', d: '高斯模糊自然，像素化彻底，噪点防识别，完全遮盖用于最严格的场合。' },
        { t: '照片不上传服务器', d: '全部处理在浏览器 Canvas 内完成，原图不离开你的设备。' },
        { t: '边缘余量保护', d: '模糊区域可向外扩展几个像素，避免缩放或压缩后人脸边缘重新可辨认。' },
      ],
      benefits: { title: '哪些照片需要模糊人脸？', sub: '既要发布内容，又要保护画面中的人', items: [
        { t: '活动与聚会照片', d: '发布活动回顾时，遮住未经同意入镜的参与者面孔。' },
        { t: '街拍与纪实', d: '分享街景、市集或公共场合照片时保护路人隐私。' },
        { t: '儿童相关内容', d: '学校、亲子类素材发布前遮蔽未成年人面部，符合平台规范。' },
        { t: '采访与调研素材', d: '公开受访素材前隐藏研究对象身份，方便合规传播。' },
      ] },
      related: { title: '继续处理你的图片', sub: '人脸处理只是第一步', items: [
        { href: '/blur-text', name: '文字模糊', d: '模糊截图和文档中的姓名、账号等敏感文字。' },
        { href: '/blur-image', name: '整图模糊', d: '一键对整张图片应用模糊、像素化等效果。' },
        { href: '/privacy-blur', name: '隐私处理', d: '多种选区方式和更强效果，一次处理多处敏感信息。' },
      ] },
      faq: [
        { q: '模糊后还能被认出来吗？', a: '高强度高斯模糊或像素化后肉眼无法辨认。如果画面会被专业工具分析，建议使用噪点或完全遮盖。' },
        { q: '密集人群逐个抹太慢怎么办？', a: '先用矩形框住整片人群套用像素化，再用涂抹对漏出的个别面部补一层，速度快且效果好。' },
        { q: '照片会被上传到服务器吗？', a: '不会。选区和渲染全部在浏览器本地完成，断网状态下也能使用。' },
        { q: '模糊可以撤销吗？', a: '可以。编辑器支持多步撤销与重做，也可以随时点击重新开始恢复原图。' },
      ],
    },
    en: {
      howto: { title: 'How to blur faces online', sub: 'Hide identities in photos in three steps', steps: [
        { t: 'Upload the photo', d: 'Pick or drag a photo into the editor — it opens right in your browser, no account needed.' },
        { t: 'Select the faces', d: 'Circle each face with brush, rectangle or lasso. Adjustable brush size covers even dense crowds.' },
        { t: 'Pick an effect and export', d: 'Switch between gaussian, pixel, noise and solid cover, preview, then download.' },
      ] },
      features: [
        { t: 'Three selection modes', d: 'Brush for quick strokes, rectangle for groups, lasso for irregular face contours.' },
        { t: 'Four cover effects', d: 'Gaussian looks natural, pixel is thorough, noise resists recognition, solid cover is strictest.' },
        { t: 'Never uploaded', d: 'Everything renders on the browser Canvas — originals stay on your device.' },
        { t: 'Edge margin protection', d: 'Expand a region a few pixels outward so scaling or compression never re-exposes a face.' },
      ],
      benefits: { title: 'Which photos need face blurring?', sub: 'Publish the story, protect the people in it', items: [
        { t: 'Events and parties', d: 'Hide attendees who never consented before posting event recaps.' },
        { t: 'Street and documentary', d: 'Protect passers-by when sharing street scenes or market photos.' },
        { t: 'Content with children', d: 'Blur minors\u2019 faces in school or family material to meet platform rules.' },
        { t: 'Research and interviews', d: 'De-identify study subjects before publishing interview material.' },
      ] },
      related: { title: 'Keep editing your image', sub: 'Face blurring is just step one', items: [
        { href: '/blur-text', name: 'Blur text', d: 'Hide names and account numbers in screenshots and documents.' },
        { href: '/blur-image', name: 'Full-image blur', d: 'Apply blur or pixelation to the whole picture in one click.' },
        { href: '/privacy-blur', name: 'Privacy blur', d: 'More selection modes and stronger effects for many spots at once.' },
      ] },
      faq: [
        { q: 'Can faces still be recognized after blurring?', a: 'Strong gaussian or pixelation defeats the naked eye. For adversarial analysis use noise or solid cover.' },
        { q: 'Too slow to brush over a crowd?', a: 'Draw one rectangle over the crowd with pixelation, then touch up any exposed faces with the brush.' },
        { q: 'Are photos uploaded anywhere?', a: 'No. Selection and rendering run entirely in your browser — it even works offline.' },
        { q: 'Can I undo a blur?', a: 'Yes. Multi-step undo/redo is supported, and you can always restart to get the original back.' },
      ],
    },
  },
  'blur-text': {
    zh: {
      howto: { title: '如何模糊图片中的文字', sub: '三个步骤隐藏截图和文档里的敏感信息', steps: [
        { t: '上传截图或文档照片', d: '支持 PNG、JPG、WebP，聊天记录、订单页、合同扫描件都可以直接处理。' },
        { t: '框选文字区域', d: '矩形框选一行或多行文字最方便，套索可以贴合不规则排版的段落。' },
        { t: '加强度并导出', d: '文字建议拉高模糊强度或直接用完全遮盖，确认无法辨认后下载。' },
      ] },
      features: [
        { t: '矩形框选成段文字', d: '拖一个框就能覆盖整行、整段，比逐字涂抹快得多。' },
        { t: '完全遮盖效果', d: '对身份证号、密码、验证码这类绝对不能泄露的文字，用纯色块直接盖住。' },
        { t: '涂抹处理零散字段', d: '画笔模式下沿不规则排布的文字随手划过，一笔覆盖多处。' },
        { t: '本地处理保隐私', d: '含敏感信息的截图最不该外传——处理全程在本地完成，原图不出设备。' },
      ],
      benefits: { title: '哪些文字发布前必须遮住？', sub: '一眼扫过去，凡是能定位到人的都算', items: [
        { t: '聊天记录', d: '遮住头像、昵称、手机号，避免对话截图被对号入座。' },
        { t: '订单与账单', d: '订单号、收货地址、金额明细，晒单前都应处理。' },
        { t: '合同与文档', d: '盖章扫描件里的编号、姓名和条款，公开前遮蔽敏感段落。' },
        { t: '后台与数据看板', d: '系统截图中的内部名称、密钥和用户数据，发出去前必须打码。' },
      ] },
      related: { title: '继续处理你的图片', sub: '文字处理只是第一步', items: [
        { href: '/blur-face', name: '人脸模糊', d: '模糊照片中的人脸和身份细节。' },
        { href: '/privacy-blur', name: '隐私处理', d: '一次处理截图中多处敏感信息。' },
        { href: '/compress-image', name: '图片压缩', d: '打码完成后压缩体积，方便上传和发送。' },
      ] },
      faq: [
        { q: '模糊后的文字还能被还原吗？', a: '高强度高斯模糊和像素化后基本无法还原。对验证码、密码这类内容，建议直接使用完全遮盖。' },
        { q: '文字用什么效果最合适？', a: '小字号文字建议拉高像素化强度或用完全遮盖；大标题类文字高斯模糊即可。' },
        { q: '支持批量处理吗？', a: '当前版本专注单张图的精细处理，批量能力在规划中。' },
        { q: '导出会加水印吗？', a: '不会。导出即所得，无水印、无 logo，免费使用。' },
      ],
    },
    en: {
      howto: { title: 'How to blur text in images', sub: 'Hide sensitive text in screenshots in three steps', steps: [
        { t: 'Upload the screenshot', d: 'PNG, JPG and WebP all work — chats, order pages, scanned contracts, anything.' },
        { t: 'Box the text', d: 'A rectangle covers a whole line or paragraph at once; lasso fits irregular layouts.' },
        { t: 'Raise strength and export', d: 'For text, push strength high or use solid cover, confirm it is unreadable, then download.' },
      ] },
      features: [
        { t: 'Rectangle for paragraphs', d: 'One drag covers entire lines and paragraphs — far faster than brushing letter by letter.' },
        { t: 'Solid cover effect', d: 'For IDs, passwords and OTP codes that must never leak, mask them with a flat color block.' },
        { t: 'Brush for scattered fields', d: 'Sweep the brush across irregularly placed labels to cover many spots in one stroke.' },
        { t: 'Local keeps it private', d: 'Sensitive screenshots are the last thing you should upload — processing never leaves your device.' },
      ],
      benefits: { title: 'What text must be covered before sharing?', sub: 'If it can identify a person or account, cover it', items: [
        { t: 'Chat logs', d: 'Hide avatars, nicknames and phone numbers before posting conversations.' },
        { t: 'Orders and bills', d: 'Order numbers, shipping addresses and amounts all deserve masking.' },
        { t: 'Contracts and documents', d: 'Cover reference numbers, names and clauses in scanned paperwork.' },
        { t: 'Dashboards and admin panels', d: 'Internal names, keys and user data must be redacted in system screenshots.' },
      ] },
      related: { title: 'Keep editing your image', sub: 'Text redaction is just step one', items: [
        { href: '/blur-face', name: 'Blur faces', d: 'Hide faces and identity details in photos.' },
        { href: '/privacy-blur', name: 'Privacy blur', d: 'Redact many sensitive spots in one pass.' },
        { href: '/compress-image', name: 'Compress image', d: 'Shrink the file after redacting for easy sharing.' },
      ] },
      faq: [
        { q: 'Can blurred text be recovered?', a: 'Strong gaussian or pixelation is effectively irreversible. For passwords and codes, use solid cover.' },
        { q: 'Which effect works best on text?', a: 'Small text: strong pixelation or solid cover. Large headings: gaussian is usually enough.' },
        { q: 'Is batch processing supported?', a: 'The current version focuses on single-image precision; batch is planned.' },
        { q: 'Is there a watermark on export?', a: 'No. What you see is what you download — no watermark, no logo, free to use.' },
      ],
    },
  },
  'blur-license-plate': {
    zh: {
      howto: { title: '如何在线模糊车牌', sub: '三个步骤隐藏车辆照片中的号牌', steps: [
        { t: '上传车辆照片', d: '支持手机拍的照片和网络图片，直接拖进编辑器即可开始。' },
        { t: '框选车牌区域', d: '车牌是规则矩形，用矩形框选一次就能精确覆盖，边角留一点余量更保险。' },
        { t: '选像素化并导出', d: '车牌推荐像素化或完全遮盖，预览确认后下载成图。' },
      ] },
      features: [
        { t: '矩形精确框选', d: '车牌轮廓规则，矩形选区一次到位，比手涂更整齐。' },
        { t: '像素化效果', d: '把号牌区域打成色块，远近缩放都无法辨认字符。' },
        { t: '多车牌一次处理', d: '画面里有多辆车时逐个框选，撤销重做随时修正。' },
        { t: '原图不上传', d: '车辆照片在本地处理，位置信息不外泄。' },
      ],
      benefits: { title: '哪些车辆照片需要遮车牌？', sub: '凡是会被公开发布的，都建议处理', items: [
        { t: '二手车交易图', d: '挂牌出售车辆时遮住号牌，防止信息被挪用。' },
        { t: '汽车自媒体内容', d: '评测、改装、自驾内容发布前统一遮牌是行业惯例。' },
        { t: '街拍与旅行分享', d: '画面里出现他人车辆时，遮住号牌避免纠纷。' },
        { t: '保险与事故材料', d: '提交或展示理赔材料时遮蔽双方号牌。' },
      ] },
      related: { title: '继续处理你的图片', sub: '车牌处理只是第一步', items: [
        { href: '/blur-face', name: '人脸模糊', d: '同车照片里的人脸也建议一并处理。' },
        { href: '/blur-image', name: '整图模糊', d: '需要整张做背景时一键应用模糊。' },
        { href: '/crop-rotate-image', name: '裁剪与旋转', d: '调整构图后再发布，图片更干净。' },
      ] },
      faq: [
        { q: '车牌用模糊还是像素化？', a: '都有效。像素化色块感更强、更醒目；高斯模糊更自然。要求严格的场合建议完全遮盖。' },
        { q: '能一次处理多张照片吗？', a: '当前版本逐张处理以保证精度；一张照片里的多个车牌可以逐个框选。' },
        { q: '会压缩画质吗？', a: '导出保持原分辨率，只处理你选中的区域，其余像素不变。' },
        { q: '照片会被上传吗？', a: '不会。处理在浏览器本地完成，车辆照片不离开你的设备。' },
      ],
    },
    en: {
      howto: { title: 'How to blur license plates online', sub: 'Hide plates in car photos in three steps', steps: [
        { t: 'Upload the photo', d: 'Phone shots and web images both work — drag the picture into the editor.' },
        { t: 'Box the plate', d: 'Plates are neat rectangles — one rectangle selection covers it exactly; leave a small margin.' },
        { t: 'Pixelate and export', d: 'Pixelation or solid cover works best for plates. Preview, then download.' },
      ] },
      features: [
        { t: 'Exact rectangle selection', d: 'Plate contours are regular, so one rectangle nails it — cleaner than freehand brushing.' },
        { t: 'Pixelation effect', d: 'Turns the plate into color blocks, unreadable at any zoom level.' },
        { t: 'Multiple plates per photo', d: 'Box each car one by one; undo and redo keep every fix easy.' },
        { t: 'Originals stay local', d: 'Car photos are processed on your device — location never leaks.' },
      ],
      benefits: { title: 'Which car photos need plate blurring?', sub: 'If it will be published, blur it first', items: [
        { t: 'Used-car listings', d: 'Mask plates in sale photos so the number cannot be misused.' },
        { t: 'Automotive content', d: 'Reviews, mods and road-trip posts conventionally hide plates before publishing.' },
        { t: 'Street and travel shots', d: 'Cover other people\u2019s plates in shared street scenes to avoid disputes.' },
        { t: 'Insurance and claims', d: 'Redact both plates when submitting or showing claim documents.' },
      ] },
      related: { title: 'Keep editing your image', sub: 'Plate blurring is just step one', items: [
        { href: '/blur-face', name: 'Blur faces', d: 'Faces in the same shot deserve the same treatment.' },
        { href: '/blur-image', name: 'Full-image blur', d: 'Apply blur to the whole picture for backgrounds.' },
        { href: '/crop-rotate-image', name: 'Crop & rotate', d: 'Tidy the composition before publishing.' },
      ] },
      faq: [
        { q: 'Blur or pixelate for plates?', a: 'Both work. Pixelation looks bolder and obvious; gaussian is subtler. For strict cases use solid cover.' },
        { q: 'Can I process photos in bulk?', a: 'The current version handles one photo at a time for precision; multiple plates within a photo can be boxed one by one.' },
        { q: 'Will export reduce quality?', a: 'Export keeps the original resolution — only your selected area changes.' },
        { q: 'Are photos uploaded?', a: 'No. Processing runs in your browser; car photos never leave your device.' },
      ],
    },
  },
};
