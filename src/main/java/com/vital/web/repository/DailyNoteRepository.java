package com.vital.web.repository;

import com.vital.web.domain.DailyNote;
import com.vital.web.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyNoteRepository extends JpaRepository<DailyNote, String> {
}
