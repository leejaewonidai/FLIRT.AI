// src/app/page.tsx
"use client";

import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const signupSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSignup = () => {
    setButtonClicked(true);
    if (signupSectionRef.current) {
      signupSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

    // 버튼 클릭 여부를 Google Sheets에 전송하는 함수
    useEffect(() => {
        if (buttonClicked) {
            const testClickData = {
                clicked: true,
                time: new Date().toISOString(),
                testField: "Test data for button click"
            };

            axios.get(`https://script.google.com/macros/s/AKfycby_a5Dyfus7KufSpv2YwwrI9fzAQ-6_vu_fvyZlPvn1uDewt0Sm1SZVaeX55lrjpv9I/exec`, {
                params: {
                    action: 'insert',
                    data: JSON.stringify(testClickData)
                }
            })
            .then(response => console.log("Button click recorded:", response.data))
            .catch(error => console.error("Failed to record button click:", error));
        }
    }, [buttonClicked]);

    // handleSubmit 함수도 같은 방식으로 수정
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;

        if (!email) {
        alert("유효한 이메일을 입력해 주세요.");
        return;
        }

        const data = {
        id: "test123",
        landingUrl: window.location.href,
        ip: "127.0.0.1",
        referer: "http://test-referer.com",
        time_stamp: new Date().toISOString(),
        utm: "test-utm",
        device: "Test Device - Chrome 89",
        email: email,
        clicked: buttonClicked,
        testField: "Test data for form submission"
        };

        try {
            const response = await axios.get(`/api/saveToSheet`, {
                params: {
                    action: 'insert',
                    data: JSON.stringify(data)
                }
            });
            console.log("이메일 전송 성공:", response.data);
        } catch (error) {
            console.error("이메일 전송 실패:", error);
        }
    };


    return (
        <div className="relative h-screen w-full overflow-y-auto">
            {/* 배경 이미지와 필터 효과 */}
            <div
                className="absolute inset-0 w-screeen h-screen bg-cover bg-center "
                style={{
                    backgroundImage: 'url("/1page.png")',
                    filter: 'blur(3px) brightness(1.0) contrast(1.0)',
                    zIndex: -1,  // 배경 요소가 가장 아래에 위치하도록 설정
                }}
            ></div>
            {/* 헤더 섹션 */}
            <header className="w-full bg-white py-3 px-6 flex items-center shadow-md fixed top-0 left-0 right-0 z-10"> {/* header 굴기랑 사진 왼쪽 위치 조절*/}
                {/* 왼쪽에 로고 */}
                <img src="/logo.png" alt="flirt.ai 로고" className="w-16 h-6 object-contain" />{/*w랑 h이용해서 헤더랑 로고 크기 조절*/}
            </header>

            {/* 본문 섹션 */}
            <div className="flex-1 flex items-start justify-center relative" style={{ marginBottom: '100px' }}>
                <div className="absolute inset-0 bg-white bg-opacity-60" style={{ marginBottom: '-100px' }}></div> {/* 반투명 오버레이 , 이거 배경 기본 색깔도 있음*/}

                <div className="relative max-w-md mx-auto text-center text-black mt-24">
                    <h1 className="text-xl font-semibold mb-8">연락을 했는데, 답장이 오지 않는다면?</h1>
                    <p className="text-xl mb-56 font-semibold leading-relaxed">설레는 이성에게<br/>매력적인 대화 상대가 되고 싶다면?</p>
                    <p className="text-2xl mb-8 font-extrabold">연인으로 이어주는<br />#1 대화 추천 서비스</p>
                    
                    {/* 하단 로고 이미지 */}
                    <img src="/logo.png" alt="flirt.ai 로고" className="w-40 mx-auto mb-12" />

                    <button
                    onClick={scrollToSignup}
                    className="bg-black text-white text-lg font-black leading-relaxed py-4 px-8 rounded-full hover:bg-gray-700 transition tracking-wide font-pretendard"
                    style={{
                        boxShadow: '3px 5px 5px #434343b2',
                    }}
                    >
                    지금 바로 사전 신청하기
                    </button>
                </div>
            </div>

            {/* 페이지 하단에 스크롤 가능한 섹션 */}
            <section className="relative bg-white text-black w-full px-6 py-10" style={{ maxHeight: '80vh' }}>
                <h2 className="text-base font-bold text-center mb-12" style={{ color: '#000' }}>이제는 그 사람이 당신의 연락을 기다리게 됩니다</h2>
                <p className="text-center text-base font-bold leading-relaxed mb-6" style={{ color: '#000' }}>
                    연애 강사진이 선정한 100,000건의<br />데이터로 학습, 테스트를 통해 검증했습니다
                </p>
                <div className="text-center mb-10">
                    <p className="text-xl font-medium px-0 py-0 inline-block whitespace-nowrap" style={{ backgroundColor: '#f7eeec', color: '#000', borderRadius: '4px' }}>
                        대화 지속 시간 상승률 <span className="text-2xl font-semibold text-black">96.4%</span>
                    </p>
                </div>
                <p className="text-center text-base font-bold leading-relaxed mt-6" style={{ color: '#000' }}>
                    지금 내 상황에 맞는 멘트를 생성해 보세요
                </p>
            </section>
            
            {/* 손 잡는 이미지 섹션*/}
            <div className='w-full'>
                <img src="/handtohand.jpeg" alt="손 잡는 이미지" className='w-full h-auto' />
            </div>

            {/* 스텝 설명하는 섹션*/}
            <section className="bg-white text-center py-10">
                <h2 className="text-xl font-bold mb-8">간단한 2 STEP으로 해결</h2>

                <div className="flex justify-center space-x-10">
                    {/* STEP 1 */}
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">01</div>
                        <p className="text-base font-semibold">스크린샷 올리기</p>
                    </div>

                    {/* STEP 2 */}
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">02</div>
                        <p className="text-base font-semibold">대화 추천 받기</p>
                    </div>
                </div>
            </section>

           {/* Step 1 섹션*/}
            <section
                    className="relative flex justify-center items-center py-20 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/step1back.png")', // 배경 이미지 경로 수정
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top center',
                        filter: 'brightness(1.0)',
                    }}
                >
                    {/* 오버레이 레이어 */}
                    <div className="absolute inset-0 bg-white bg-opacity-60"></div> {/* 오버레이 추가 */}

                    {/* 콘텐츠 레이아웃 */}
                    <div className="relative z-10 flex items-center gap-10 max-w-5xl mx-auto px-3">
                        
                    {/* STEP 텍스트 영역 */}
                    <div className="absolute" style={{ flexShrink: 0,top: '-70px', left: '20px', textAlign: 'left' }}>
                        <h2 className="text-lg font-semibold" style={{ marginBottom: '-4px' }}>STEP 1</h2>
                        <p className="text-2xl font-semibold" style={{ marginTop: '-4px' }}>스크린샷 올리기</p>
                    </div>

                    {/* 폰 이미지 */}
                    <div className="relative flex-shrink-0" style={{ minWidth: '200px' }}>
                        <img 
                            src="/step1mock.png" 
                            alt="폰 화면" 
                            className="w-full h-auto"
                            style={{
                                maxWidth: '200px',
                                marginBottom: '-70px'
                            }}
                        />
                    </div>

                            {/* 설명 텍스트 영역 */}
                            <div className="text-right max-w-md" style={{ position: 'relative', top: '-70px', whiteSpace: 'nowrap' }}>
                                {/* 본문 설명 텍스트 */}
                                <div style={{ position: 'relative', top: '50px', left: '-10px'}}> {/* 위쪽으로 약간 이동 */}
                                    <p className="text-base leading-relaxed font-semibold">
                                        연애 전문가의<br/>  
                                        조언이 필요한 상황<br />
                                        <span style={{ marginTop: '20px', display: 'inline-block'}}>
                                            이제는 고민하지 말고
                                        </span><br/>
                                        간편하게 물어보세요
                                    </p>
                                </div>
                                
                                {/* 하단 추가 설명 텍스트 */}
                                <div style={{ position: 'relative', top: '210px', right : '5px' }}> {/* 아래쪽으로 약간 이동 */}
                                    <p className="text-xs text-black">
                                        *대화 내역 등 개인정보는<br />
                                        안전하게 보호됩니다
                                    </p>
                                </div>
                        </div>
                    </div>
                </section>

           {/* Step 2 섹션*/}
           <section
                    className="relative flex justify-center items-center py-20 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/step2back.png")', // 배경 이미지 경로 수정
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top center',
                        filter: 'brightness(1.0)',
                    }}
                >

                    {/* 오버레이 레이어 */}
                    <div className="absolute inset-0 bg-opacity-60"></div> {/* 오버레이 추가 */}

                    {/* 콘텐츠 레이아웃 */}
                    <div className="relative z-10 flex flex-row-reverse items-center gap-10 max-w-5xl mx-auto px-3">
                        
                    {/* STEP 텍스트 영역 */}
                    <div className="absolute text-white" style={{ flexShrink: 0,top: '-70px', left: '250px', textAlign: 'right' }}>
                        <h2 className="text-lg font-semibold" style={{ marginBottom: '-4px' }}>STEP 2</h2>
                        <p className="text-2xl font-semibold" style={{ marginTop: '-4px' }}>대화 추천 받기</p>
                    </div>

                    {/* 폰 이미지 */}
                    <div className="relative flex-shrink-0" style={{ minWidth: '200px' }}>
                        <img 
                            src="/step2mock.png" 
                            alt="폰 화면" 
                            className="w-full h-auto"
                            style={{
                                maxWidth: '200px',
                                marginBottom: '-70px'
                            }}
                        />
                    </div>

                            {/* 설명 텍스트 영역 */}
                            <div className="text-left max-w-md text-white" style={{ position: 'relative', top: '-70px', whiteSpace: 'nowrap' }}>
                                {/* 본문 설명 텍스트 */}
                                <div style={{ position: 'relative', top: '50px', left: '20px'}}> {/* 위쪽으로 약간 이동 */}
                                    <p className="text-base leading-relaxed font-semibold">
                                        상대방의 응답에 기반한<br/>  
                                        상황별 멘트 추천<br />
                                        <span style={{ marginTop: '20px', display: 'inline-block'}}>
                                            이제는
                                        </span><br/>
                                        친구에서 썸으로,<br />
                                        썸에서 연인으로<br />
                                        발전하세요
                                    </p>
                                </div>
                                
                                {/* 하단 추가 설명 텍스트 */}
                                <div style={{ position: 'relative', top: '180px', left: '20px' }}> {/* 아래쪽으로 약간 이동 */}
                                    <p className="text-xs text-white">
                                        *대화 내역 등 개인정보는<br />
                                        안전하게 보호됩니다
                                    </p>
                                </div>
                        </div>
                    </div>
                </section>

                {/*  또 설명하는 내용 */}
                <section className="relative bg-white text-black w-full px-6 py-10" style={{ maxHeight: '80vh' }}>
                    <h2 className="text-base font-medium text-center mb-2" style={{ color: '#000' }}>
                        20-30대 연인들에게 물었습니다
                    </h2>

                    <p className="text-center text-base font-medium leading-relaxed mb-2" style={{ color: '#000' }}>
                        성공적인 연애를 위한 가장 중요한 요인
                    </p>

                    <div className="text-center mb-10">
                        <p className="text-2xl font-semibold px-0 py-1 inline-block" style={{ backgroundColor: '#f7eeec', color: '#000', borderRadius: '4px' }}>
                            상대방과의 원활한 대화
                        </p>
                    </div>

                    <p className="text-center text-base font-medium leading-relaxed mt-6 mb-2" style={{ color: '#000' }}>
                        당신의 행복한 연애 생활,
                    </p>

                    <div className="text-center">
                        <p className="text-2xl font-semibold px-0 py-1 inline-block" style={{ backgroundColor: '#f7eeec', color: '#000', borderRadius: '4px' }}>
                            매력적인 대화로부터
                        </p>
                    </div>
                </section>

                {/* 손 잡는 이미지 섹션*/}
                <div className='w-full'>
                    <img src="/handtohand2.jpeg" alt="손 잡는 이미지" className='w-full h-auto' />
                </div>

                {/* 가장 마지막 부분 */}
                <section ref={signupSectionRef} className="p-3 text-center w-full max-w-md mx-auto mt-0">
                    <p className="text-sm font-semibold mb-1 text-black">
                        이미 베타 테스트에서 <span className="text-black">200+ 커플</span>이 탄생했습니다
                    </p>
                    <p className="text-sm font-semibold text-black mb-6">이제는 나도 솔로 탈출!</p>

                    <h2 className="text-2xl font-bold mb-1">사전 신청하기</h2>

                    <hr className="border-gray-300 my-4" />

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                        name="email"
                        type="email"
                        placeholder="이메일 주소를 입력해 주세요"
                        className="border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:outline-none"
                        />
                        <button
                        type="submit"
                        className="w-full bg-[#a2776f] text-white py-2 rounded-md font-semibold hover:bg-[#8c625a] transition"
                        >
                        사전 신청하기
                        </button>
                    </form>
                </section>


        </div>
    );
}