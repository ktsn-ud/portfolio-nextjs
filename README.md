# ポートフォリオサイト

Next.js 16 (App Router) で構築した、スキル・プロジェクト・経歴を紹介するモダンでレスポンシブなポートフォリオサイトです。

公開中のサイトはこちらから。  
https://portfolio.ktsnud.dev

## 概要

個人のポートフォリオサイトです。以下のセクションで構成されています：

- **About** - 自己紹介とプロフィール
- **Skills** - スキルと専門知識
- **Works** - ポートフォリオ作品
- **History** - 経歴
- **Contact** - お問い合わせ

## 使用技術

- **フレームワーク**: [Next.js 16](https://nextjs.org/)（React 19）
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS 4](https://tailwindcss.com/)
- **アイコン**: [React Icons](https://react-icons.github.io/react-icons/)
- **パッケージマネージャー**: pnpm
- **Linter / Formatter**: ESLint & Prettier

## セットアップ

### 必要な環境

- Node.js 18 以上
- pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/ktsn-ud/portfolio-nextjs.git
cd portfolio-nextjs

# 依存パッケージをインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
pnpm dev
```

ブラウザで `http://localhost:3000` を開くと確認できます。

### 本番ビルド

```bash
# 本番用にビルド
pnpm build

# 本番サーバーを起動
pnpm start
```

### リント実行

```bash
# ESLint を実行
pnpm lint
```

## プロジェクト構成

```
.
├── app/                    # Next.js app ディレクトリ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ（/aboutにリダイレクト）
│   ├── about/             # About セクション
│   ├── contact/           # Contact セクション
│   ├── history/           # 職務経歴セクション
│   ├── skills/            # スキルセクション
│   └── works/             # ポートフォリオセクション
├── components/            # 再利用可能な React コンポーネント
│   ├── heading.tsx
│   ├── sidebar.tsx
│   └── tableOfContents.tsx
├── public/                # 静的ファイル
│   ├── fonts/
│   └── img/
└── [設定ファイル]          # Next.js、TypeScript、ESLint など
```

## デプロイ先

[Cloudflare Pages](https://pages.cloudflare.com/)

公開中のサイト：https://portfolio.ktsnud.dev

### デプロイ方法

このプロジェクトは GitHub に push すると自動的に Cloudflare Pages にデプロイされます。

## 特徴

- 全デバイスに対応したレスポンシブデザイン
- Next.js 16 による高速なパフォーマンス
- TypeScript による型安全な開発
- Tailwind CSS による最新のスタイリング
- SEO 対応の構造

## データソース / 謝辞

- 競技プログラミング（AtCoder）関連データの取得に [AtCoder Problems API](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md) を利用しています。素晴らしい API を公開いただきありがとうございます。また、 AtCoder 公式によるユーザーコンテスト履歴の json 公開を利用しています。

## お問い合わせ

ご質問やお問い合わせは、サイトの [Contact ページ](https://portfolio.ktsnud.dev/contact) からお願いします。
