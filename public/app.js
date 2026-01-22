/// app.js | I have no idea what to call it other than app.js lol
/// by: VTILServer.com (ErringPaladin10)
/// started: 01/22/2026
/// heve fun!

/// This took me like 2 minutes to code, as I just made it overly complicated all the time
/// so I kept having to redo it.
/// so this should not be overly complicated, I hope. Lol.
document.addEventListener('DOMContentLoaded', function() {
    try {
        const currentYear = new Date().getFullYear();
        const footerCompany = 'VTIL LLC';
        const footerCompanyEmail = 'ErringPaladin10@VTILServer.com';
        const footerText = document.querySelector('#footer');
        if (footerText) {
            footerText.textContent = `Copyright© ${currentYear} ${footerCompany} | ${footerCompanyEmail}. All rights reserved.`;
        }
    } catch (error) {
        console.error('Error updating footer:', error);
    }
});