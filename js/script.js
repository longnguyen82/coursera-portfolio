$(document).ready(function() {

    // --- 1. Navigation Toggle ---
    $('.nav-toggle').on('click', function() {
        // Toggle the active class on the nav menu
        $('.main-nav').toggleClass('active');
        
        // A11y: Update aria-expanded attribute
        const isExpanded = $('.main-nav').hasClass('active');
        $(this).attr('aria-expanded', isExpanded);
    });

    // Close menu when a link is clicked (Mobile UX)
    $('.main-nav a').on('click', function() {
        if ($(globalThis).width() < 768) {
            $('.main-nav').removeClass('active');
            $('.nav-toggle').attr('aria-expanded', 'false');
        }
    });

    // --- 2. Project Filtering ---
    $('.filter-btn').on('click', function() {
        // Remove active class from all buttons and add to clicked
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        const category = $(this).data('filter');

        $('.project-item').each(function() {
            // Logic: if category is 'all' OR item has matching data-category, show it
            if (category === 'all' || $(this).data('category') === category) {
                $(this).fadeIn(300);
            } else {
                $(this).fadeOut(300);
            }
        });
    });

    // --- 3. Lightbox Effect ---
    const $lightbox = $('#lightbox');
    const $lightboxImg = $('#lightbox-img');

    // Open Lightbox
    $('.project-img-wrapper').on('click', function() {
        const src = $(this).find('img').attr('src');
        const alt = $(this).find('img').attr('alt');
        
        $lightboxImg.attr('src', src);
        $lightboxImg.attr('alt', alt);
        
        $lightbox.css('display', 'flex').hide().fadeIn(300);
        $('body').css('overflow', 'hidden'); // Prevent background scrolling
    });

    // Close Lightbox (Click on X or outside image)
    $('.close-lightbox, .lightbox').on('click', function(e) {
        if (e.target !== $lightboxImg[0]) {
            $lightbox.fadeOut(300);
            $('body').css('overflow', 'auto'); // Restore scrolling
        }
    });

    // --- 4. Contact Form Validation ---
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        let isValid = true;

        // Reset previous errors
        $('.form-group').removeClass('error');
        $('#formStatus').text('');

        // Validate Name
        const name = $('#name').val().trim();
        if (name === '') {
            $('#name').parent().addClass('error');
            isValid = false;
        }

        // Validate Email (Simple Regex)
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#email').parent().addClass('error');
            isValid = false;
        }

        // Validate Message
        const message = $('#message').val().trim();
        if (message === '') {
            $('#message').parent().addClass('error');
            isValid = false;
        }

        // Final Submission Logic
        if (isValid) {
            // Simulate API call
            const $btn = $(this).find('button');
            const originalText = $btn.text();
            
            $btn.text('Sending...').prop('disabled', true);

            setTimeout(function() {
                $('#formStatus').text('Thanks, ' + name + '! Your message has been sent.').css('color', 'green');
                $('#contactForm')[0].reset();
                $btn.text(originalText).prop('disabled', false);
            }, 1500);
        }
    });

});