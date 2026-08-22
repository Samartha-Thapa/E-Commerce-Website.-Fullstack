<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;
    public string $email;

    /**
     * Create a new message instance.
     */
    public function __construct(string $email)
    {
        $this->email = $email;
    }

    public function build() {
        return $this->subject('Reset Your Passord')
                    ->html("
                        <h1>Password Reset Link<h1>
                        <p>Click the link below to reset your password</p>
                        <a href='http://localhost:3000/reset-password?email=" . urlencode($this->email) ."'>Reset Password</a>
                    ");
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Password Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
