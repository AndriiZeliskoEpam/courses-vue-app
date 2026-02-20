<script setup>
  const handleAddCourse = () => {
    window.location.href = '/courses/create'
  }
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">📚</div>
    <h2>No Courses Available</h2>
    <p class="empty-message">
      It looks like there are no courses yet. Get started by creating your first course!
    </p>
    <Button text="Create First Course" class="add-course-btn" @click="handleAddCourse" />
  </div>
</template>

<style scoped lang="scss">
  .empty-state {
    text-align: center;
    padding: 60px 40px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 8px;
    max-width: 500px;
    margin: 0 auto;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  h2 {
    margin: 20px 0 10px;
    font-size: 28px;
    color: #333;
    font-weight: 600;
  }

  .empty-message {
    margin: 0 0 30px;
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }

  .add-course-btn {
    padding: 12px 32px;
    background-color: #007298;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-course-btn:hover {
    background-color: #005a73;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .add-course-btn:active {
    transform: translateY(0);
  }
</style>