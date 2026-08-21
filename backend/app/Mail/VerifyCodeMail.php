<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyCodeMail extends Mailable
{
    use Queueable, SerializesModels;
    public string $code;

    /**
     * Create a new message instance.
     */
    public function __construct(string $code)
    {
        $this->code = $code;
    }

    public function build() {
        return $this->subject("Verify Your Email")
                    ->html("
                        <h1>Email Verification</h1>
                        <p>Your Verification code is: </string> {$this->code} </strong></p>
                        <p>This code will expire in 15 minutes</p>
                    ");
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verify Code Mail',
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
