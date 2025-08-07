import { Blog7 } from "@/components/blocks/Blog7";

const blogData = {
  tagline: "Mental Health & Wellness",
  heading: "Latest Articles & Insights",
  description:
    "Discover expert insights, practical tips, and inspiring stories about mental health, therapy, and personal growth. Stay informed with our latest articles and resources.",
  buttonText: "View all articles",
  buttonUrl: "/blog",
  posts: [
    {
      id: "post-1",
      title: "Understanding Anxiety: Signs, Symptoms, and Coping Strategies",
      summary:
        "Learn to recognize the signs of anxiety and discover effective coping strategies. This comprehensive guide covers everything from daily stress to clinical anxiety disorders.",
      label: "Mental Health",
      author: "Dr. Sarah Johnson",
      published: "15 Dec 2024",
      url: "/blog/anxiety-coping-strategies",
      image: "/clouds.jpg",
    },
    {
      id: "post-2",
      title: "The Benefits of Online Therapy: A Complete Guide",
      summary:
        "Explore how online therapy can provide convenient, effective mental health support. Learn about different platforms, what to expect, and how to get the most from virtual sessions.",
      label: "Online Therapy",
      author: "Dr. Michael Chen",
      published: "12 Dec 2024",
      url: "/blog/online-therapy-benefits",
      image: "/clouds.jpg",
    },
    {
      id: "post-3",
      title: "Building Resilience: 5 Key Strategies for Mental Strength",
      summary:
        "Develop mental resilience with proven strategies that help you bounce back from challenges. This practical guide offers actionable steps for building emotional strength.",
      label: "Wellness",
      author: "Dr. Emily Rodriguez",
      published: "10 Dec 2024",
      url: "/blog/building-resilience",
      image: "/clouds.jpg",
    },
    {
      id: "post-4",
      title: "Mindfulness Meditation: A Beginner's Guide",
      summary:
        "Start your mindfulness journey with this beginner-friendly guide. Learn simple meditation techniques that can reduce stress and improve your overall well-being.",
      label: "Mindfulness",
      author: "Dr. Lisa Thompson",
      published: "8 Dec 2024",
      url: "/blog/mindfulness-beginners-guide",
      image: "/clouds.jpg",
    },
    {
      id: "post-5",
      title: "Depression and Relationships: Supporting Loved Ones",
      summary:
        "Learn how to support someone with depression while maintaining your own mental health. This guide provides practical advice for friends and family members.",
      label: "Relationships",
      author: "Dr. James Wilson",
      published: "5 Dec 2024",
      url: "/blog/supporting-depression-loved-ones",
      image: "/clouds.jpg",
    },
    {
      id: "post-6",
      title: "Self-Care Practices for Busy Professionals",
      summary:
        "Discover effective self-care strategies that fit into a busy schedule. Learn how to prioritize your mental health even when time is limited.",
      label: "Self-Care",
      author: "Dr. Amanda Davis",
      published: "3 Dec 2024",
      url: "/blog/self-care-busy-professionals",
      image: "/clouds.jpg",
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Blog7 {...blogData} />
    </div>
  );
}
