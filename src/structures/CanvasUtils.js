class CanvasUtils {
    
    static writeParagraph(ctx, message, font, x, y, maxWidth, fontSize, fontFace, {color = '#FFFFFF'} = {}) {
        ctx.font = font;
        ctx.fillStyle = color;
        const text = message.split(' ');
        let line = '';
        const lineHeight = fontSize + 2;

        ctx.font = fontSize+ " " + fontFace;

        for (let n = 0; n < text.length; n++) {
            const textLine = line + text[n] + ' ';
            const metrics = ctx.measureText(textLine);
            const textWidth = metrics.width;
                if (textWidth > maxWidth) {
                    ctx.fillText(line, x, y) 
                    line = text[n] + ' ';
                    y += lineHeight;
                }   else {
                    line = textLine;
                    
                }
        }
        ctx.fillText(line, x, y)
    }
    
    static avatarCircle(ctx, avatarURL, dx, dy, dw, dh) {
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.arc(66, 120.5, 53, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.clip();
        ctx.drawImage(avatarURL, dx, dy, dw, dh);
    }

    static write(ctx, text, font, w, h, align = false, { color = '#FFFFFF'} = {}) {
        ctx.font = font;
        ctx.fillStyle = color;
        if (align) ctx.textAlign = "center";
        else ctx.textAlign = "start";
        ctx.fillText(text, w, h)
    }
}
module.exports = CanvasUtils;