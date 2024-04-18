<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $primaryKey = 'id';
    protected $fillable = [
        'amount',
        "full_name",
        "phone_number",
        "addr",
        "note",
        "user_id"
    ];
    public $timestamps = true;
}
