<?php

namespace App\Notifications;

use App\Models\Withdrawal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WithdrawalApprovedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Withdrawal $withdrawal) {}

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
            ->subject('Withdrawal Request Approved')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Your withdrawal request has been approved.')
            ->line('Amount: ' . $this->withdrawal->amount . ' BDT')
            ->line('Payment Method: ' . $this->withdrawal->method)
            ->line('The amount will be transferred to your account shortly.')
            ->action('View Withdrawals', config('app.frontend_url') . '/vendor/withdrawals')
            ->line('Thank you for using Multi Vendor Ecommerce!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'withdrawal_id' => $this->withdrawal->id,
            'amount' => $this->withdrawal->amount,
            'message' => 'Your withdrawal request of ' . $this->withdrawal->amount . ' BDT has been approved.',
        ];
    }
}
