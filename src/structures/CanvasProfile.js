const {createCanvas, loadImage} = require('canvas');
const Util = require('./CanvasUtils');

module.exports = class ProfileClass {
    static async profile(user, about, level, coins, xp, xpup) {

        const canvas = createCanvas(360, 400);
        const ctx = canvas.getContext('2d');

        const background = await loadImage('assets/png/profile4.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Username#tag & XP
        Util.write(ctx, user.username, 'bold 29px "Montserrat"', canvas.width / 2.8, canvas.height / 2.7);
        Util.write(ctx, `#${user.discriminator}`, '16px"Montserrat"', canvas.width / 2.8, canvas.height / 2.4);
        Util.write(ctx, `XP: ${xp}/${xpup.need(level+1)}`, '12px "Montserrat"', canvas.width / 2.8, 184);        
        
        Util.write(ctx, 'about', '20px "Montserrat ExtraBold"', canvas.width / 14, 243)
        // About message limit should be lesser than 200 character
        Util.writeParagraph(ctx, about, '12px "Montserrat"', canvas.width / 14, 257, 330, 12);

        // Coins
        Util.write(ctx, coins, '20px "Montserrat"', 260, 350, true);

        // Level
        Util.write(ctx, level, '20px "Montserrat"', 99, 350, true);

        // Avatar & Circle alpha matted
        const avatar = await loadImage(user.displayAvatarURL().replace('.webp', '.png'));
        Util.avatarCircle(ctx, avatar, 8, 65, 115, 115)
      
        return canvas.toBuffer();
    }
}