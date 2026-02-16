// Entrance Animations
document.addEventListener('DOMContentLoaded', function() {
    // Trigger hero animations on load
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe stagger items
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach(item => {
        observer.observe(item);
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
        
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Interactive Mockup Functionality
    const mockups = document.querySelectorAll('.mockup-mini');
    
    mockups.forEach((mockup, index) => {
        // Add click feedback
        mockup.addEventListener('click', function(e) {
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
            
            // Different interactions based on mockup index
            switch(index) {
                case 0: // Bank Sync
                    handleBankSyncClick(this);
                    break;
                case 1: // Mark Subscriptions
                    handleSubscriptionClick(this, e);
                    break;
                case 2: // Categorize
                    handleCategoryClick(this, e);
                    break;
                case 3: // View & Track
                    handleViewTrackClick(this);
                    break;
            }
        });
        
        // Prevent event bubbling for buttons and spans
        const buttons = mockup.querySelectorAll('button');
        const spans = mockup.querySelectorAll('span');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                handleMockupButtonClick(this, index);
            });
        });
        
        spans.forEach(span => {
            span.addEventListener('click', function(e) {
                e.stopPropagation();
                handleMockupSpanClick(this, index);
            });
        });
    });
    
    // Special handling for step 2 confirmed state clicks
    const subscriptionMockup = mockups[1]; // Step 2 mockup
    if (subscriptionMockup) {
        subscriptionMockup.addEventListener('click', function(e) {
            // Check if we're in confirmed state (animation visible OR button hidden)
            const confirmationArea = document.getElementById('subscription-confirmation-animation');
            const confirmButton = document.querySelector('.confirm-subscription-button');
            
            if ((confirmationArea && confirmationArea.style.display !== 'none') || 
                (confirmButton && confirmButton.style.display === 'none')) {
                e.stopPropagation();
                resetSubscriptionState();
            }
        });
    }
    
    // Special handling for sync bank button
    const syncButton = document.querySelector('.sync-bank-button');
    if (syncButton) {
        syncButton.addEventListener('click', function(e) {
            e.stopPropagation();
            startBankSync();
        });
    }
    
    // Special handling for confirm subscription button
    const confirmButton = document.getElementById('confirm-subscription-button');
    if (confirmButton) {
        confirmButton.addEventListener('click', function(e) {
            e.stopPropagation();
            showConfirmationAnimation();
        });
    }
    
    // Special handling for save category button
    const saveCategoryButton = document.querySelector('#save-category-button');
    if (saveCategoryButton) {
        saveCategoryButton.addEventListener('click', function(e) {
            e.stopPropagation();
            showSaveCategoryFeedback();
        });
    }
    
    function showSaveCategoryFeedback() {
        const button = document.querySelector('#save-category-button');
        const feedback = document.querySelector('#save-feedback');
        const categorySelection = document.querySelector('#category-selection');
        
        // Get selected category
        const selectedSpan = document.querySelector('#category-selection span[style*="background: #6340D9"]');
        const selectedCategory = selectedSpan ? selectedSpan.textContent : 'Entertainment';
        
        if (button && feedback && categorySelection) {
            // Hide button and selection, show feedback
            button.style.display = 'none';
            categorySelection.style.display = 'none';
            feedback.style.display = 'block';
            
            // Update feedback with selected category
            const categoryText = feedback.querySelector('div[style*="margin-top: 4px"]');
            if (categoryText) {
                categoryText.textContent = `Netflix → ${selectedCategory}`;
            }
            
            // Add scale animation to feedback
            feedback.style.transform = 'scale(0.8)';
            feedback.style.opacity = '0';
            feedback.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
            
            setTimeout(() => {
                feedback.style.transform = 'scale(1)';
                feedback.style.opacity = '1';
            }, 50);
        }
    }
    
    function showConfirmationAnimation() {
        const button = document.getElementById('confirm-subscription-button');
        const feedback = document.getElementById('subscription-confirmation-feedback');
        
        if (button && feedback) {
            // Hide button, show feedback
            button.style.display = 'none';
            feedback.style.display = 'block';
        }
    }
    
    function handleBankSyncClick(mockup) {
        // Check if we're in complete state and allow reset
        const completeState = document.getElementById('sync-complete');
        if (completeState && completeState.style.display !== 'none') {
            resetBankSync();
            // showNotification('Reset bank sync', 'info');
        }
    }
    
    // Bank sync flow function
    function startBankSync() {
        const initialState = document.getElementById('sync-initial');
        const syncingState = document.getElementById('sync-syncing');
        const completeState = document.getElementById('sync-complete');
        
        // Hide initial, show syncing
        initialState.style.display = 'none';
        syncingState.style.display = 'flex';
        completeState.style.display = 'none';
        
        // showNotification('Starting bank sync...', 'info');
        
        // Simulate sync completion after 2 seconds
        setTimeout(() => {
            syncingState.style.display = 'none';
            completeState.style.display = 'block';
            // showNotification('Bank sync complete! 3 transactions found', 'success');
        }, 2000);
    }
    
    function resetBankSync() {
        const initialState = document.getElementById('sync-initial');
        const syncingState = document.getElementById('sync-syncing');
        const completeState = document.getElementById('sync-complete');
        
        // Reset to initial state
        initialState.style.display = 'flex';
        syncingState.style.display = 'none';
        completeState.style.display = 'none';
    }
    
    function handleSubscriptionClick(mockup, e) {
        const feedback = mockup.querySelector('#subscription-confirmation-feedback');
        
        // If feedback is visible, it means we are in "Confirmed" state - reset it
        if (feedback && (feedback.style.display === 'block' || window.getComputedStyle(feedback).display === 'block')) {
            resetSubscriptionState(mockup);
            return;
        }
        
        const card = mockup.querySelector('.bg-success');
        if (card && !e.target.closest('button')) {
            // Toggle subscription status (only if not confirmed)
            const isSubscribed = card.innerHTML.includes('Subscription');
            if (isSubscribed) {
                card.innerHTML = `
                    <div style="font-weight: 700; font-size: 16px; color: #1A1A1A; margin-bottom: 8px;">Netflix</div>
                    <div style="font-size: 14px; color: #6b7280;">£15.99/month</div>
                    <div style="background: #f3f4f6; color: #6b7280; padding: 4px 12px; border-radius: 12px; display: inline-block; margin-top: 8px; font-size: 12px; font-weight: 600;">Regular transaction</div>
                `;
            } else {
                card.innerHTML = `
                    <div style="font-weight: 700; font-size: 16px; color: #1A1A1A; margin-bottom: 8px;">Netflix</div>
                    <div style="font-size: 14px; color: #6b7280;">£15.99/month</div>
                    <div style="background: #00D084; color: white; padding: 4px 12px; border-radius: 12px; display: inline-block; margin-top: 8px; font-size: 12px; font-weight: 600;">Subscription</div>
                `;
            }
        }
    }

    function resetSubscriptionState(mockup) {
        const button = mockup.querySelector('#confirm-subscription-button');
        const feedback = mockup.querySelector('#subscription-confirmation-feedback');
        const card = mockup.querySelector('.bg-success');
        
        if (button && feedback && card) {
            // Reset visibility
            feedback.style.display = 'none';
            button.style.display = 'block';
            
            // Ensure card is in base state
            card.innerHTML = `
                <div style="font-weight: 700; font-size: 16px; color: #1A1A1A; margin-bottom: 8px;">Netflix</div>
                <div style="font-size: 14px; color: #6b7280;">£15.99/month</div>
                <div style="background: #00D084; color: white; padding: 4px 12px; border-radius: 12px; display: inline-block; margin-top: 8px; font-size: 12px; font-weight: 600;">Subscription</div>
            `;
        }
    }
    
    function handleCategoryClick(mockup, e) {
        const feedback = document.querySelector('#save-feedback');
        
        // Check if we're in saved state and need to reset
        if (feedback && feedback.style.display !== 'none') {
            resetCategoryState();
            return;
        }
        
        const spans = mockup.querySelectorAll('span');
        spans.forEach(span => {
            if (!e.target.closest('button')) {
                // Toggle category selection
                if (span.classList.contains('selected')) {
                    span.classList.remove('selected');
                    span.style.background = '#f3f4f6';
                    span.style.color = '#6b7280';
                } else {
                    // Clear other selections
                    spans.forEach(s => {
                        s.classList.remove('selected');
                        s.style.background = '#f3f4f6';
                        s.style.color = '#6b7280';
                    });
                    // Select this one
                    span.classList.add('selected');
                    span.style.background = '#6340D9';
                    span.style.color = 'white';
                    // showNotification(`Category: ${span.textContent}`, 'success');
                }
            }
        });
    }
    
    function resetCategoryState() {
        const button = document.querySelector('#save-category-button');
        const feedback = document.querySelector('#save-feedback');
        const categorySelection = document.querySelector('#category-selection');
        
        if (button && feedback && categorySelection) {
            // Reset to original state
            button.style.display = 'block';
            feedback.style.display = 'none';
            categorySelection.style.display = 'block';
            
            // Reset any animations
            feedback.style.transform = 'scale(1)';
            feedback.style.opacity = '1';
        }
    }
    
    function handleViewTrackClick(mockup) {
        const smartDemo = document.getElementById('smart-demo');
        if (smartDemo) {
            showSmartCategorizationDemo();
        }
    }
    
    let demoInterval;
    let currentDemoStep = 0;
    
    function showSmartCategorizationDemo() {
        // Clear any existing interval
        if (demoInterval) {
            clearInterval(demoInterval);
        }
        
        // Reset to initial state
        resetDemoState();
        
        // Start the animation sequence
        demoInterval = setInterval(() => {
            currentDemoStep++;
            
            switch(currentDemoStep) {
                case 1:
                    // Highlight month 2 auto-categorization
                    animateMonth2();
                    break;
                case 2:
                    // Highlight month 3 auto-categorization
                    animateMonth3();
                    break;
                case 3:
                    // Reset and restart
                    currentDemoStep = 0;
                    resetDemoState();
                    break;
            }
        }, 1500);
    }
    
    function animateMonth2() {
        const month2 = document.getElementById('month2');
        if (month2) {
            month2.style.opacity = '0';
            month2.style.transform = 'scale(0.95)';
            month2.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                month2.style.opacity = '1';
                month2.style.transform = 'scale(1.05)';
                
                // Add pulse effect to auto-categorized subscription items only
                const subscriptionChips = month2.querySelectorAll('div[style*="background: #4285F4"]');
                subscriptionChips.forEach(chip => {
                    chip.style.transform = 'scale(1.1)';
                    chip.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.3)';
                    chip.style.transition = 'all 0.3s ease-out';
                });
                
                setTimeout(() => {
                    subscriptionChips.forEach(chip => {
                        chip.style.transform = 'scale(1)';
                        chip.style.boxShadow = 'none';
                    });
                    month2.style.transform = 'scale(1)';
                }, 300);
            }, 100);
        }
    }
    
    function animateMonth3() {
        const month3 = document.getElementById('month3');
        if (month3) {
            month3.style.opacity = '0';
            month3.style.transform = 'scale(0.95)';
            month3.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                month3.style.opacity = '1';
                month3.style.transform = 'scale(1.05)';
                
                // Add pulse effect to auto-categorized subscription items only
                const subscriptionChips = month3.querySelectorAll('div[style*="background: #4285F4"]');
                subscriptionChips.forEach(chip => {
                    chip.style.transform = 'scale(1.1)';
                    chip.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.3)';
                    chip.style.transition = 'all 0.3s ease-out';
                });
                
                setTimeout(() => {
                    subscriptionChips.forEach(chip => {
                        chip.style.transform = 'scale(1)';
                        chip.style.boxShadow = 'none';
                    });
                    month3.style.transform = 'scale(1)';
                }, 300);
            }, 100);
        }
    }
    
    function resetDemoState() {
        const month2 = document.getElementById('month2');
        const month3 = document.getElementById('month3');
        
        if (month2) {
            month2.style.opacity = '1';
            month2.style.transform = 'scale(1)';
            month2.style.transition = 'none';
        }
        
        if (month3) {
            month3.style.opacity = '1';
            month3.style.transform = 'scale(1)';
            month3.style.transition = 'none';
        }
        
        currentDemoStep = 0;
    }
    
    function handleMockupButtonClick(button, mockupIndex) {
        // Add button press animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        const buttonText = button.textContent;
        // showNotification(`Action: ${buttonText}`, 'success');
        
        // Special handling for different buttons
        if (buttonText.includes('Confirm') && mockupIndex !== 1) {
            // Mark as confirmed
            button.textContent = '✓ Confirmed';
            button.style.background = '#00D084';
            button.disabled = true;
        }
    }
    
    function handleMockupSpanClick(span, mockupIndex) {
        // Add span click animation
        span.style.transform = 'scale(1.1)';
        setTimeout(() => {
            span.style.transform = '';
        }, 150);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        // Set colors based on type
        switch(type) {
            case 'success':
                notification.style.background = '#00D084';
                notification.style.color = 'white';
                break;
            case 'info':
                notification.style.background = '#4285F4';
                notification.style.color = 'white';
                break;
            default:
                notification.style.background = '#6340D9';
                notification.style.color = 'white';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});
