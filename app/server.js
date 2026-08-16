:root{
    --wine: #5B1A2B;
    --wine-deep: #3D0F1E;
    --blush: #E8B4B8;
    --blush-soft: #F3D9DA;
    --ivory: #FBF3EC;
    --gold: #C9A15A;
    --gold-soft: #DDC28C;
    --ink: #2E1420;
    --ink-soft: #6B4C56;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background:var(--ivory);
    color:var(--ink);
    font-family:'Jost', sans-serif;
    font-weight:400;
    overflow-x:hidden;
  }
  h1,h2,h3,.serif{font-family:'Fraunces', serif;}
  a{color:inherit; text-decoration:none;}
  button{font-family:inherit; cursor:pointer; border:none;}
  ::selection{background:var(--gold-soft); color:var(--wine-deep);}

  /* subtle paper texture */
  body::before{
    content:"";
    position:fixed; inset:0;
    background-image: radial-gradient(circle at 1px 1px, rgba(91,26,43,0.035) 1px, transparent 0);
    background-size: 22px 22px;
    pointer-events:none;
    z-index:0;
  }

  /* ---------- NAV ---------- */
  nav{
    position:sticky; top:0; z-index:50;
    display:flex; align-items:center; justify-content:space-between;
    padding:20px clamp(20px,5vw,64px);
    background:rgba(251,243,236,0.85);
    backdrop-filter:blur(8px);
    border-bottom:1px solid rgba(91,26,43,0.08);
  }
  .logo{font-size:1.4rem; font-weight:600; letter-spacing:0.02em; color:var(--wine);}
  .logo em{font-style:italic; color:var(--gold);}
  .nav-links{display:flex; gap:clamp(16px,3vw,36px); align-items:center; font-size:0.92rem; letter-spacing:0.03em;}
  .nav-links a{color:var(--ink-soft); transition:color 0.2s;}
  .nav-links a:hover{color:var(--wine);}
  .nav-cta{
    background:var(--wine); color:var(--ivory);
    padding:10px 22px; border-radius:2px;
    font-size:0.88rem; letter-spacing:0.05em;
    transition:background 0.25s;
  }
  .nav-cta:hover{background:var(--wine-deep);}

  /* ---------- HERO — envelope reveal ---------- */
  .hero{
    position:relative;
    min-height:92vh;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center;
    padding:80px 20px 40px;
    overflow:hidden;
  }
  .eyebrow{
    font-size:0.78rem; letter-spacing:0.28em; text-transform:uppercase;
    color:var(--gold); margin-bottom:22px;
    opacity:0; animation:fadeUp 0.9s ease 0.15s forwards;
  }
  .hero h1{
    font-size:clamp(2.6rem, 7vw, 5.2rem);
    font-weight:500;
    line-height:1.02;
    color:var(--wine-deep);
    max-width:16ch;
    opacity:0; animation:fadeUp 1s ease 0.35s forwards;
  }
  .hero h1 i{color:var(--gold); font-style:italic; font-weight:500;}
  .hero p{
    margin-top:26px;
    font-size:clamp(1rem,2vw,1.2rem);
    color:var(--ink-soft);
    max-width:46ch;
    opacity:0; animation:fadeUp 1s ease 0.55s forwards;
  }
  .hero-ctas{
    margin-top:38px; display:flex; gap:16px; flex-wrap:wrap; justify-content:center;
    opacity:0; animation:fadeUp 1s ease 0.75s forwards;
  }
  .btn-primary{
    background:var(--wine); color:var(--ivory);
    padding:15px 34px; border-radius:2px;
    font-size:0.95rem; letter-spacing:0.04em;
    position:relative; overflow:hidden;
    transition:transform 0.25s, box-shadow 0.25s;
  }
  .btn-primary:hover{transform:translateY(-2px); box-shadow:0 10px 24px rgba(91,26,43,0.28);}
  .btn-ghost{
    border:1px solid var(--wine); color:var(--wine);
    padding:15px 30px; border-radius:2px;
    font-size:0.95rem; letter-spacing:0.04em;
    transition:background 0.25s, color 0.25s;
  }
  .btn-ghost:hover{background:var(--wine); color:var(--ivory);}
  @keyframes fadeUp{from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:translateY(0);}}

  .envelope-wrap{
    margin-top:56px; width:min(92vw, 460px); aspect-ratio:16/10;
    position:relative;
    opacity:0; animation:fadeUp 1s ease 0.95s forwards;
  }
  .envelope{
    position:absolute; inset:0;
    background:linear-gradient(160deg, var(--blush-soft), var(--blush));
    border-radius:6px;
    box-shadow:0 30px 60px -20px rgba(91,26,43,0.35);
  }
  .flap{
    position:absolute; top:0; left:0; right:0; height:55%;
    background:linear-gradient(160deg, var(--blush), var(--blush-soft));
    clip-path:polygon(0 0, 100% 0, 50% 78%);
    transform-origin:top;
    transition:transform 1s cubic-bezier(.6,0,.3,1);
    border-radius:6px 6px 0 0;
  }
  .envelope-wrap:hover .flap{transform:rotateX(180deg);}
  .seal{
    position:absolute; top:44%; left:50%; transform:translate(-50%,-50%);
    width:54px; height:54px; border-radius:50%;
    background:radial-gradient(circle at 35% 30%, var(--gold-soft), var(--gold) 70%);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 14px rgba(201,161,90,0.5);
    font-family:'Fraunces',serif; font-style:italic; color:var(--wine-deep); font-size:1.3rem;
    z-index:3;
  }
  .card-peek{
    position:absolute; bottom:8%; left:50%; transform:translateX(-50%);
    width:74%; background:var(--ivory);
    border-radius:4px; padding:16px 20px;
    box-shadow:0 10px 28px rgba(46,20,32,0.15);
    font-family:'Fraunces',serif; font-size:0.95rem; color:var(--ink);
    z-index:2;
  }
  .hero-hint{margin-top:18px; font-size:0.78rem; letter-spacing:0.05em; color:var(--ink-soft); opacity:0.75;}

  /* ---------- SECTION generic ---------- */
  section{position:relative; z-index:1; padding:110px clamp(20px,6vw,80px);}
  .section-head{max-width:640px; margin:0 auto 60px; text-align:center;}
  .section-eyebrow{font-size:0.78rem; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold); margin-bottom:14px;}
  .section-head h2{font-size:clamp(1.9rem,4vw,2.8rem); color:var(--wine-deep); font-weight:500;}
  .section-head p{margin-top:16px; color:var(--ink-soft); font-size:1.02rem;}

  /* ---------- PROFILE STACK ---------- */
  .stack-area{
    max-width:420px; margin:0 auto; position:relative; height:560px;
  }
  .pcard{
    position:absolute; inset:0;
    background:var(--ivory);
    border-radius:10px;
    box-shadow:0 24px 48px -12px rgba(46,20,32,0.25);
    overflow:hidden;
    display:flex; flex-direction:column;
    transition:transform 0.45s cubic-bezier(.6,0,.3,1), opacity 0.45s;
  }
  .pcard .photo{
    height:62%; width:100%;
    display:flex; align-items:center; justify-content:center;
    font-family:'Fraunces',serif; font-size:5rem; color:var(--ivory);
    position:relative;
  }
  .pcard .photo .stamp{
    position:absolute; top:16px; right:16px;
    background:rgba(251,243,236,0.85); color:var(--wine-deep);
    font-size:0.72rem; letter-spacing:0.08em; padding:5px 10px; border-radius:20px;
  }
  .pcard .info{padding:20px 24px; flex:1; display:flex; flex-direction:column; justify-content:space-between;}
  .pcard .info h3{font-size:1.5rem; color:var(--wine-deep); font-weight:500;}
  .pcard .info .meta{font-size:0.85rem; color:var(--ink-soft); margin-top:4px; letter-spacing:0.02em;}
  .pcard .info p{margin-top:10px; font-size:0.92rem; color:var(--ink); line-height:1.5;}
  .pcard .tags{margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;}
  .pcard .tags span{
    font-size:0.72rem; letter-spacing:0.04em; color:var(--wine);
    border:1px solid var(--blush); padding:4px 10px; border-radius:20px;
  }
  .actions{
    display:flex; justify-content:center; gap:22px; margin-top:34px;
  }
  .act-btn{
    width:62px; height:62px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-size:1.5rem; background:var(--ivory);
    box-shadow:0 8px 20px rgba(46,20,32,0.15);
    transition:transform 0.2s, box-shadow 0.2s;
  }
  .act-btn:hover{transform:translateY(-3px) scale(1.05);}
  .act-pass{color:var(--ink-soft);}
  .act-like{
    background:radial-gradient(circle at 35% 30%, var(--gold-soft), var(--gold) 75%);
    color:var(--wine-deep); font-family:'Fraunces',serif; font-style:italic;
    width:74px; height:74px; font-size:1.8rem;
  }
  .stack-empty{
    display:none; flex-direction:column; align-items:center; justify-content:center;
    height:100%; text-align:center; color:var(--ink-soft);
  }
  .stack-empty h3{color:var(--wine-deep); font-size:1.4rem; margin-bottom:10px;}
  .stack-empty button{
    margin-top:20px; background:var(--wine); color:var(--ivory);
    padding:12px 26px; border-radius:2px; font-size:0.88rem; letter-spacing:0.04em;
  }

  /* ---------- MATCHES ---------- */
  .matches-wrap{max-width:900px; margin:0 auto;}
  .match-empty{
    text-align:center; color:var(--ink-soft); padding:40px 20px;
    border:1px dashed var(--blush); border-radius:8px;
  }
  .match-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:22px;}
  .match-card{
    background:var(--ivory); border-radius:10px; overflow:hidden;
    box-shadow:0 14px 30px rgba(46,20,32,0.12);
    transition:transform 0.25s;
    cursor:pointer;
  }
  .match-card:hover{transform:translateY(-4px);}
  .match-card .mphoto{
    height:150px; display:flex; align-items:center; justify-content:center;
    font-family:'Fraunces',serif; font-size:2.6rem; color:var(--ivory);
  }
  .match-card .mname{padding:14px 16px; font-family:'Fraunces',serif; font-size:1.1rem; color:var(--wine-deep);}
  .match-card .mnote{padding:0 16px 16px; font-size:0.8rem; color:var(--ink-soft);}

  /* chat modal */
  .chat-overlay{
    position:fixed; inset:0; background:rgba(46,20,32,0.55);
    display:none; align-items:center; justify-content:center; z-index:100; padding:20px;
  }
  .chat-box{
    width:min(92vw,420px); height:min(70vh,560px);
    background:var(--ivory); border-radius:12px; overflow:hidden;
    display:flex; flex-direction:column;
    box-shadow:0 30px 60px rgba(0,0,0,0.3);
  }
  .chat-head{
    padding:18px 22px; background:var(--wine); color:var(--ivory);
    display:flex; align-items:center; justify-content:space-between;
    font-family:'Fraunces',serif; font-size:1.1rem;
  }
  .chat-head button{background:none; color:var(--ivory); font-size:1.2rem; opacity:0.8;}
  .chat-body{flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px;}
  .msg{max-width:75%; padding:10px 14px; border-radius:14px; font-size:0.88rem; line-height:1.4;}
  .msg.them{background:var(--blush-soft); align-self:flex-start; border-bottom-left-radius:4px;}
  .msg.me{background:var(--wine); color:var(--ivory); align-self:flex-end; border-bottom-right-radius:4px;}
  .chat-input{display:flex; border-top:1px solid rgba(91,26,43,0.1); padding:12px;}
  .chat-input input{
    flex:1; border:none; background:var(--blush-soft); border-radius:20px;
    padding:10px 16px; font-family:'Jost'; font-size:0.88rem; color:var(--ink);
    outline:none;
  }
  .chat-input button{
    margin-left:10px; background:var(--gold); color:var(--wine-deep);
    width:38px; height:38px; border-radius:50%; font-size:1rem;
  }

  /* ---------- FEATURES ---------- */
  .features{max-width:1000px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:36px;}
  .feature{text-align:left;}
  .feature .fnum{font-family:'Fraunces',serif; font-style:italic; color:var(--gold); font-size:1.6rem; margin-bottom:10px;}
  .feature h3{color:var(--wine-deep); font-size:1.2rem; font-weight:500; margin-bottom:8px;}
  .feature p{color:var(--ink-soft); font-size:0.92rem; line-height:1.55;}

  /* ---------- FOOTER ---------- */
  footer{
    background:var(--wine-deep); color:var(--blush-soft);
    padding:60px clamp(20px,6vw,80px) 34px;
    text-align:center;
  }
  footer .logo{color:var(--ivory); display:inline-block; margin-bottom:14px;}
  footer p{font-size:0.85rem; opacity:0.75; max-width:44ch; margin:0 auto;}
  footer .fbottom{margin-top:34px; font-size:0.72rem; opacity:0.5; letter-spacing:0.04em;}

  @media (max-width:640px){
    .nav-links{display:none;}
  }

  /* ---------- AUTH MODAL ---------- */
  .auth-overlay{
    position:fixed; inset:0; background:rgba(46,20,32,0.6);
    display:none; align-items:center; justify-content:center; z-index:200; padding:20px;
  }
  .auth-box{
    width:min(92vw,460px); max-height:88vh; overflow-y:auto;
    background:var(--ivory); border-radius:12px;
    box-shadow:0 30px 70px rgba(0,0,0,0.35);
    padding:36px 32px 30px;
    position:relative;
  }
  .auth-close{
    position:absolute; top:18px; right:18px;
    background:none; color:var(--ink-soft); font-size:1.2rem;
  }
  .auth-step-label{font-size:0.72rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:8px;}
  .auth-box h3{font-family:'Fraunces',serif; font-size:1.5rem; color:var(--wine-deep); font-weight:500; margin-bottom:6px;}
  .auth-box .sub{font-size:0.85rem; color:var(--ink-soft); margin-bottom:24px; line-height:1.5;}
  .field{margin-bottom:16px;}
  .field label{display:block; font-size:0.78rem; letter-spacing:0.03em; color:var(--ink-soft); margin-bottom:6px;}
  .field input, .field select{
    width:100%; padding:11px 14px; border-radius:6px;
    border:1px solid rgba(91,26,43,0.18); background:#fff;
    font-family:'Jost'; font-size:0.92rem; color:var(--ink);
    outline:none; transition:border-color 0.2s;
  }
  .field input:focus, .field select:focus{border-color:var(--wine);}
  .field-row{display:flex; gap:12px;}
  .field-row .field{flex:1;}
  .field-error{font-size:0.75rem; color:#A13A3A; margin-top:5px; display:none;}
  .field.invalid input{border-color:#A13A3A;}
  .field.invalid .field-error{display:block;}
  .auth-submit{
    width:100%; background:var(--wine); color:var(--ivory);
    padding:13px; border-radius:6px; font-size:0.92rem; letter-spacing:0.03em;
    margin-top:8px; transition:background 0.2s;
  }
  .auth-submit:hover{background:var(--wine-deep);}
  .auth-switch{text-align:center; margin-top:18px; font-size:0.82rem; color:var(--ink-soft);}
  .auth-switch a{color:var(--wine); text-decoration:underline;}

  .id-upload{
    border:1.5px dashed var(--blush); border-radius:10px;
    padding:28px 20px; text-align:center; cursor:pointer;
    transition:border-color 0.2s, background 0.2s;
    margin-bottom:16px;
  }
  .id-upload:hover{border-color:var(--gold); background:rgba(201,161,90,0.06);}
  .id-upload .icon{font-size:1.8rem; margin-bottom:8px;}
  .id-upload .title{font-family:'Fraunces',serif; color:var(--wine-deep); font-size:1rem; margin-bottom:4px;}
  .id-upload .hint{font-size:0.78rem; color:var(--ink-soft);}
  .id-preview{
    display:none; align-items:center; gap:12px;
    background:#fff; border-radius:8px; padding:12px 14px; margin-bottom:16px;
    border:1px solid rgba(91,26,43,0.12);
  }
  .id-preview img{width:56px; height:56px; object-fit:cover; border-radius:6px;}
  .id-preview .fname{font-size:0.85rem; color:var(--ink); flex:1; word-break:break-all;}
  .id-preview .remove{color:#A13A3A; font-size:0.8rem;}
  .id-types{display:flex; gap:8px; margin-bottom:18px; flex-wrap:wrap;}
  .id-types button{
    flex:1; min-width:100px; padding:9px; border-radius:20px;
    border:1px solid var(--blush); background:#fff; font-size:0.78rem; color:var(--ink-soft);
    transition:all 0.2s;
  }
  .id-types button.active{background:var(--wine); color:var(--ivory); border-color:var(--wine);}

  .verif-status{text-align:center; padding:10px 0;}
  .verif-status .spinner{
    width:48px; height:48px; border-radius:50%;
    border:3px solid var(--blush-soft); border-top-color:var(--gold);
    margin:0 auto 20px; animation:spin 0.9s linear infinite;
  }
  @keyframes spin{to{transform:rotate(360deg);}}
  .verif-status .check{
    width:60px; height:60px; border-radius:50%; margin:0 auto 18px;
    background:radial-gradient(circle at 35% 30%, var(--gold-soft), var(--gold) 75%);
    display:flex; align-items:center; justify-content:center; font-size:1.6rem; color:var(--wine-deep);
  }
  .privacy-note{
    font-size:0.72rem; color:var(--ink-soft); line-height:1.5;
    background:var(--blush-soft); padding:12px 14px; border-radius:8px; margin-top:16px;
  }
  .user-badge{
    display:none; align-items:center; gap:8px;
    background:var(--blush-soft); padding:7px 14px 7px 7px; border-radius:20px;
    font-size:0.82rem; color:var(--wine-deep);
  }
  .user-badge .avatar{
    width:26px; height:26px; border-radius:50%; background:var(--wine);
    color:var(--ivory); display:flex; align-items:center; justify-content:center;
    font-family:'Fraunces',serif; font-size:0.8rem;
  }
  .user-badge .vtag{color:var(--gold); font-size:0.9rem;}
  .gate-msg{
    display:none; text-align:center; padding:60px 20px; color:var(--ink-soft);
  }
  .gate-msg h3{color:var(--wine-deep); font-family:'Fraunces',serif; font-size:1.4rem; margin-bottom:10px;}
  .gate-msg button{
    margin-top:18px; background:var(--wine); color:var(--ivory);
  }
  /* ---------- MESSAGERIE EN DIRECT (vrais comptes) ---------- */
  .direct-wrap{max-width:520px; margin:0 auto;}
  .room-picker{
    background:var(--ivory); border:1px solid rgba(91,26,43,0.12); border-radius:12px;
    padding:34px 28px; text-align:center;
  }
  .room-picker .or-sep{font-size:0.78rem; color:var(--ink-soft); margin:18px 0; letter-spacing:0.05em;}
  .join-row{display:flex; gap:10px;}
  .join-row input{
    flex:1; padding:12px 14px; border-radius:6px; border:1px solid rgba(91,26,43,0.18);
    font-family:'Jost'; font-size:0.92rem; text-transform:uppercase; letter-spacing:0.06em;
    outline:none; background:#fff;
  }
  .join-row input:focus{border-color:var(--wine);}
  .room-hint{font-size:0.78rem; color:var(--ink-soft); margin-top:14px;}

  .live-chat{
    background:var(--ivory); border-radius:12px; overflow:hidden;
    border:1px solid rgba(91,26,43,0.12);
    box-shadow:0 20px 40px rgba(46,20,32,0.1);
    display:flex; flex-direction:column; height:520px;
  }
  .live-head{
    background:var(--wine); color:var(--ivory);
    padding:16px 20px; display:flex; align-items:center; justify-content:space-between;
  }
  .live-label{font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; opacity:0.75;}
  .live-code{font-family:'Fraunces',serif; font-size:1.2rem; letter-spacing:0.08em;}
  .live-actions{display:flex; gap:10px;}
  .call-btn, .leave-btn{
    background:rgba(251,243,236,0.16); color:var(--ivory);
    width:38px; height:38px; border-radius:50%; font-size:1rem;
  }
  .leave-btn{width:auto; border-radius:20px; padding:0 14px; font-size:0.78rem;}
  .live-body{flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px;}
  .live-body .msg.system{
    align-self:center; background:none; color:var(--ink-soft); font-size:0.76rem; letter-spacing:0.03em;
  }

  /* ---------- CALL OVERLAY ---------- */
  .call-overlay{
    position:fixed; inset:0; background:rgba(46,20,32,0.75);
    display:none; align-items:center; justify-content:center; z-index:300; padding:20px;
  }
  .call-box{
    width:min(90vw,340px); background:var(--wine-deep); color:var(--ivory);
    border-radius:20px; padding:44px 30px 34px; text-align:center;
  }
  .call-avatar{
    width:88px; height:88px; border-radius:50%; margin:0 auto 20px;
    background:radial-gradient(circle at 35% 30%, var(--gold-soft), var(--gold) 75%);
    display:flex; align-items:center; justify-content:center;
    font-family:'Fraunces',serif; font-size:2.2rem; color:var(--wine-deep);
    animation:pulseCall 1.6s ease-in-out infinite;
  }
  @keyframes pulseCall{0%,100%{box-shadow:0 0 0 0 rgba(201,161,90,0.5);} 50%{box-shadow:0 0 0 16px rgba(201,161,90,0);}}
  .call-status{font-family:'Fraunces',serif; font-size:1.2rem; margin-bottom:6px;}
  .call-timer{font-size:0.85rem; opacity:0.7; letter-spacing:0.04em; margin-bottom:18px;}
  .call-note{font-size:0.7rem; opacity:0.6; line-height:1.5; margin-bottom:28px;}
  .call-actions{display:flex; justify-content:center; gap:24px;}
  .call-decline, .call-accept{
    width:56px; height:56px; border-radius:50%; font-size:1.3rem;
  }
  .call-decline{background:#A13A3A; color:var(--ivory);}
  .call-accept{background:var(--gold); color:var(--wine-deep);}
