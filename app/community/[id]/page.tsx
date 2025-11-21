export default function CommunityDetail({ params }: { params: { id: string } }) {
  return <div>게시글 상세: {params.id}</div>;
}
