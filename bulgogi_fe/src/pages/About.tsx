import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
              불고기에 대하여
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto">
              아이디어가 익고, 생각이 무르익으며, 이야기가 따뜻하게 차려지는 공간
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/about.svg"
                alt="우리의 이야기"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">우리의 이야기</h2>
              <p className="text-lg text-neutral-600">
                불고기는 2023년, ‘편안한 글쓰기 공간’이라는 단순한 바람에서 시작되었습니다. 마치 따뜻한 밥상에 둘러앉아 이야기를 나누듯, 생각을 진심 있게 담아내고 나누는 공간을 만들고 싶었습니다.
              </p>
              <p className="text-lg text-neutral-600">
                디자이너, 개발자, 작가로 이루어진 작은 팀이 모여, 글을 쓰는 사람과 읽는 사람 모두가 편안함을 느낄 수 있는 플랫폼을 함께 만들어가고 있습니다.
              </p>
              <p className="text-lg text-neutral-600">
                지금 이 순간에도, 수많은 사람들이 불고기에서 자신의 이야기와 생각을 세상과 나누고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">우리가 소중히 여기는 것들</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              불고기를 만들어가는 중심에는 이 가치들이 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "단순함",
                description: "복잡함을 줄이고, 본질에 집중합니다. 중요한 건 오직 당신의 글입니다.",
              },
              {
                title: "품질",
                description: "좋은 글에는 좋은 공간이 필요합니다. 세심하게 디자인된 경험으로 글을 더욱 빛나게 합니다.",
              },
              {
                title: "연결",
                description: "글쓰기는 혼자만의 일이 아닙니다. 사람과 사람을 이어주는 따뜻한 연결을 만들어갑니다.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">함께 만드는 사람들</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              불고기를 함께 만들어가는 팀을 소개합니다
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Kumgu Kim",
                role: "창립자 & 대표",
                image: "/images/111.svg",
              },
              {
                name: "amuge",
                role: "디자인 총괄",
                image: "/images/222.svg",
              },
              {
                name: "choongang",
                role: "리드 개발자",
                image: "/images/333.svg",
              },
              {
                name: "HK Kim",
                role: "커뮤니티 매니저",
                image: "/images/444.svg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">{member.name}</h3>
                <p className="text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">함께 해요</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8">
            당신의 이야기를 기다리고 있어요. 불고기에서 글을 쓰고, 함께 나눠보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-neutral-900 bg-white hover:bg-neutral-100 transition-colors duration-200"
            >
              회원가입
            </Link>
            <Link
              to="/blog-home"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white bg-transparent hover:bg-white/10 transition-colors duration-200"
            >
              블로그 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">문의하기</h2>
              <p className="text-lg text-neutral-600">
                궁금한 점이 있거나, 의견이 있으신가요? 언제든지 편하게 연락주세요.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-neutral-900">이메일</h3>
                  <p className="text-neutral-600">hello@bulgogi.blog</p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">주소</h3>
                  <p className="text-neutral-600">서울시 창작구 글쓰기로 123</p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">소셜</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">트위터</a>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">인스타그램</a>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">링크드인</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="이름을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    메시지
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="전하고 싶은 내용을 자유롭게 적어주세요"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200"
                >
                  보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
