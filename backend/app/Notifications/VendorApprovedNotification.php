<?php

namespace App\Notifications;

use App\Models\VendorProfile;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VendorApprovedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public VendorProfile $vendorProfile) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Shop Has Been Approved!')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Congratulations! Your vendor application has been approved.')
            ->line('Shop Name: ' . $this->vendorProfile->shop_name)
            ->line('You can now start adding products to your shop.')
            ->action('Go to Dashboard', config('app.frontend_url') . '/vendor/dashboard')
            ->line('Welcome to Multi Vendor Ecommerce!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'vendor_id' => $this->vendorProfile->id,
            'shop_name' => $this->vendorProfile->shop_name,
            'message' => 'Your shop ' . $this->vendorProfile->shop_name . ' has been approved.',
        ];
    }
}
